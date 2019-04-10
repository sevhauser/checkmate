<template>
    <div>
    <q-item>
      <q-item-section
        side
        top
        v-if="edit">
        <q-icon
          class="cl-handle-item"
          name="mdi-drag"/>
      </q-item-section>
      <q-item-section
        v-else
        side
        top>
        <q-icon
          @click="valueChange('done', !value.done)"
          :color="icon.color"
          :name="icon.name"/>
      </q-item-section>
      <q-item-section v-if="!edit">
        <q-item-label
          class="text-weight-medium text-body1">
          {{ value.title }}
        </q-item-label>
        <q-item-label
          class="check-list-entry-desc"
          caption>{{ value.description }}</q-item-label>
      </q-item-section>
      <q-item-section v-else>
        <q-item-label>
          <input
            class="input-inline text-weight-medium text-body1"
            :value="value.title"
            placeholder="Item Name"
            @input="valueChange('title', $event.target.value)"
            ref="title"
            @focus="focusing"
            @blur="blurred"
            @keyup.enter.exact="$refs.description.focus"
            @keyup.ctrl.enter="$emit('add-item')"/>
          <textarea
            class="input-inline input-inline--textarea text-caption
              q-item__label q-item__label--caption full-width"
            :value="value.description"
            :rows="descriptionRows"
            placeholder="Description"
            ref="description"
            @focus="focusing"
            @blur="blurred"
            @keyup.ctrl.enter="$emit('add-item')"
            @input="valueChange('description', $event.target.value)"/>
          <IconTextButton
            v-if="focused"
            color="grey-6"
            label="Add Item Below"
            @click="$emit('add-item')"/>
          <IconTextButton
            v-if="focused && inset < 2"
            color="grey-6"
            label="Add Sub-Item"
            @click="addItem"/>
        </q-item-label>
      </q-item-section>
      <q-item-section
        side
        top
        v-if="edit">
        <q-btn
          flat
          round
          size="sm"
          @click="$emit('remove')"
          icon="mdi-close-circle"/>
      </q-item-section>
    </q-item>
    <draggable
      v-if="inset < 2"
      :list="value.items"
      :group="{ name: 'items' }"
      handle=".cl-handle-item"
      :disabled="!edit"
      :style="{ paddingLeft: `${(1 + inset)}em` }"
      @start="drag = true"
      @end="drag = false"
      v-bind="dragOptions">
      <CheckListEntry
        v-for="(item, index) in value.items"
        :key="item.id"
        :edit="edit"
        v-model="value.items[index]"
        :inset="inset + 1"
        :ref="`item${index}`"
        :disable="disable"
        @add-item="addItem(index)"
        @remove="removeItem(item.id)"/>
    </draggable>
  </div>
</template>

<script>
import Vue from 'vue';
import { extend } from 'quasar';
import draggable from 'vuedraggable';
import { CheckListItem as CheckListItemModel } from '../models';
import IconTextButton from './IconTextButton.vue';

export default {
  name: 'CheckListEntry',
  data: () => ({
    dragged: false,
    focused: false,
    blurring: false,
    drag: false,
  }),
  components: {
    draggable,
    IconTextButton,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    inset: {
      type: Number,
      default: 0,
    },
    edit: {
      type: Boolean,
      default: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    icon() {
      if (this.value.done) {
        return {
          color: 'accent',
          name: 'mdi-checkbox-marked',
        };
      }
      return {
        color: '',
        name: 'mdi-checkbox-blank-outline',
      };
    },
    descriptionRows() {
      return this.value.description.split(/\r|\n/).length;
    },
  },
  methods: {
    removeItem(itemId) {
      const result = extend({}, this.value);
      result.items = result.items.filter(el => el.id !== itemId);
      this.$emit('input', result);
    },
    valueChange(key, value) {
      if (this.disable) return;
      const result = extend({}, this.value);
      result[key] = value;
      this.$emit('input', result);
      if (key === 'done') {
        this.$root.$emit('checked');
      }
    },
    focus() {
      this.$refs.title.focus();
    },
    focusing() {
      this.focused = true;
      this.blurring = false;
    },
    blurred() {
      this.blurring = true;
      setTimeout(() => {
        if (this.blurring) {
          this.focused = false;
          this.blurring = false;
        }
      }, 100);
    },
    addItem(index) {
      this.blurring = false;
      this.focused = false;
      const result = extend({}, this.value);
      result.items.splice(index + 1, 0, CheckListItemModel.create());
      this.$emit('input', result);
      Vue.nextTick().then(() => {
        this.focusItem(index + 1);
      });
    },
    focusItem(index) {
      if (this.$refs[`item${index}`]) {
        this.$refs[`item${index}`][0].focus();
      }
    },
  },
};
</script>
