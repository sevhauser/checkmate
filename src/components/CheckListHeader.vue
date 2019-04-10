<template>
  <q-item
    class="q-pa-none check-list-item"
    :class="`check-list-item--${state.state} check-list-header`">
    <q-item-section
      class="check-list-item__side"
      side
      top>
      <q-icon
        class="check-list-item__checkmark"
        :name="icon"/>
    </q-item-section>
    <q-item-section
      class="check-list-item__main">
      <q-item-label
        class="check-list-item__overline"
        overline>
          <span v-for="(tag, index) in value.tags"
            :key="index">#{{ tag }}</span>
      </q-item-label>
      <q-item-label
        class="check-list-item__title text-h6">
        <template v-if="!edit">
          {{ value.title }}
        </template>
        <input
          v-else
          type="text"
          :value="value.title"
          placeholder="New Checklist"
          class="input-inline col-grow check-list-item__title text-h6 full-width"
          @input="handleChange('title', $event.target.value)"/>
      </q-item-label>
      <q-item-label
        class="check-list-item__meta"
        caption>
        <q-icon
          size="16px" name="mdi-check-all"
          class="q-mr-xs"/>
        <span>{{ state.itemCompleteCount }} / {{ state.itemCount }}</span>
        <span
          v-if="dueDate !== ''"
          class="q-ml-sm">
          <q-icon
            name="mdi-brightness-1"
            size="6px"/> {{ dueDate }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { extend, date } from 'quasar';
import { CheckList as CheckListModel } from '../models';

export default {
  name: 'CheckListHeader',
  props: {
    value: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      return this.state.state === 'done'
        ? 'mdi-checkbox-marked-circle-outline' : 'mdi-checkbox-blank-circle-outline';
    },
    tags() {
      return `${this.value.tags.reduce((carry, val) => `${carry}#${val} `, '')} `;
    },
    state() {
      return CheckListModel.listStates(this.value);
    },
    dueDate() {
      if (this.value.dateDue !== null) {
        if (date.isSameDate(
          new Date(this.value.dateDue),
          new Date(),
          'day',
        )) {
          return 'Due today';
        }
        return `Due on ${date.formatDate(this.value.dateDue, 'YYYY/MM/DD')}`;
      }
      return '';
    },
  },
  methods: {
    handleChange(key, value) {
      const result = extend({}, this.value);
      result[key] = value;
      this.$emit('input', result);
    },
  },
};
</script>
