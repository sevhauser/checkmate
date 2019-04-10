<template>
  <div>
    <EntrySectionHeader
      :edit="edit"
      :value="value.title"
      @input="titleChange"/>
    <draggable
      :list="value.items"
      :group="{ name: 'items' }"
      :disabled="!edit"
      :class="{ 'dragzone-active': edit }"
      handle=".cl-handle-item"
      @start="drag = true"
      @end="drag = false">
      <CheckListEntry
        v-for="(item, index) in value.items"
        :key="item.id"
        :edit="edit"
        v-model="value.items[index]"
        :inset="0"
        :ref="`item${index}`"
        :disable="disable"
        @add-item="addItem(index)"
        @remove="removeItem(item.id)"
        v-bind="dragOptions"/>
    </draggable>
    <EntryToolbar
      @add-item="addItem()"
      @add-section="$emit('add-section')"
      @remove-section="$emit('remove-section')"
      :hide-remove="hideRemove"
      :show="edit"/>
  </div>
</template>

<script>
import Vue from 'vue';
import { extend } from 'quasar';
import draggable from 'vuedraggable';
import EntrySectionHeader from './EntrySectionHeader.vue';
import EntryToolbar from './EntryToolbar.vue';
import CheckListEntry from './CheckListEntry.vue';
import { CheckListItem as CheckListItemModel } from '../models';

export default {
  name: 'CheckListSection',
  components: {
    EntrySectionHeader,
    EntryToolbar,
    CheckListEntry,
    draggable,
  },
  data: () => ({
    drag: false,
  }),
  props: {
    value: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    hideRemove: {
      type: Boolean,
      default: false,
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
  },
  methods: {
    removeItem(itemId) {
      const result = extend({}, this.value);
      result.items = result.items.filter(el => el.id !== itemId);
      this.$emit('input', result);
    },
    addItem(index = null) {
      const result = extend({}, this.value);
      if (index === null) {
        result.items.push(CheckListItemModel.create());
      } else {
        result.items.splice(index + 1, 0, CheckListItemModel.create());
      }
      this.$emit('input', result);
      Vue.nextTick().then(() => {
        this.focusItem(index + 1);
      });
    },
    titleChange(value) {
      const result = extend({}, this.value);
      result.title = value;
      this.$emit('input', result);
    },
    focusItem(index) {
      if (this.$refs[`item${index}`]) {
        this.$refs[`item${index}`][0].focus();
      }
    },
  },
};
</script>
