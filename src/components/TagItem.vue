<template>
  <q-slide-item
    @left="edit"
    @right="remove">
    <template v-slot:left>
      <q-icon
        name="mdi-pencil"/>
    </template>
    <template v-slot:right>
      <q-icon
        name="mdi-delete"/>
    </template>
    <q-item
      class="check-list-item">
      <q-item-section side>
        <q-icon
          name="mdi-tag"/>
      </q-item-section>
      <q-item-section
        class="text-h6">
        #{{ tag }}
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TagItem',
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions([
      'updateTag',
      'deleteTag',
    ]),
    edit({ reset }) {
      reset();
      this.$q.dialog({
        title: 'Edit Tag',
        prompt: {
          model: this.tag,
        },
        cancel: true,
        className: 'dialog-flat',
      }).onOk((title) => {
        this.updateTag({
          oldTag: this.tag,
          newTag: title,
        });
      });
    },
    remove({ reset }) {
      reset();
      this.$q.dialog({
        title: 'Delete Tag?',
        message: 'This cannot be undone!',
        ok: {
          label: 'Delete',
          color: 'negative',
          flat: true,
        },
        cancel: true,
        className: 'dialog-flat',
      }).onOk(() => {
        this.deleteTag(this.tag);
      });
    },
  },
};
</script>
