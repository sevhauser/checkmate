<template>
  <q-item-label
    header
    v-show="edit || (value && value.length > 0)"
    class="row items-center no-wrap text-uppercase">
    <template v-if="!edit">
      {{ value }}
    </template>
    <template v-else>
      <q-icon
        v-if="edit"
        size="24px"
        style="margin-right: 16px"
        name="mdi-drag-vertical"
        class="cl-handle-section"/>
      <input
        type="text"
        :value="value"
        placeholder="Section Title"
        class="input-inline col-grow text-uppercase q-pa-none
          q-item__label q-item__label--header"
        @input="$emit('input', $event.target.value)"/>
    </template>
  </q-item-label>
</template>

<script>
export default {
  name: 'EntrySectionHeader',
  props: {
    value: {
      type: String,
      default: '',
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
