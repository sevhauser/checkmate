<template>
  <div class="list-entry-toolbar"
    :class="{ 'list-entry-toolbar--show' : show }">
    <q-toolbar class="list-entry-toolbar__toolbar">
      <IconTextButton
        icon="mdi-plus"
        @click="$emit('add-item')"
        label="New List Item"/>
      <IconTextButton
        v-if="!hideRemove"
        @click="$emit('remove-section')"
        icon="mdi-playlist-remove"
        label="Delete Section"/>
      <IconTextButton
        @click="$emit('add-section')"
        icon="mdi-playlist-plus"
        label="New Section"/>
    </q-toolbar>
  </div>
</template>

<script>
import IconTextButton from './IconTextButton.vue';

export default {
  name: 'EntryToolbar',
  components: {
    IconTextButton,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    hideRemove: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
