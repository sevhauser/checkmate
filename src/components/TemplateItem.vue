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
      class="q-pa-none check-list-item"
      :class="`check-list-item--pending`"
      :to="to">
      <q-item-section
        class="check-list-item__side"
        side
        top>
        <q-icon
          class="check-list-item__checkmark"
          name="mdi-file-outline"/>
      </q-item-section>
      <q-item-section
        class="check-list-item__main">
        <q-item-label
          class="check-list-item__overline"
          overline>
          {{ tags }}
        </q-item-label>
        <q-item-label
          class="check-list-item__title text-h6">
          {{ value.title }}
        </q-item-label>
        <q-item-label
          class="check-list-item__meta"
          caption>
          <q-icon
            size="16px" name="mdi-check-all"
            class="q-mr-xs"/>
          <span>{{ state.itemCount }}</span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script>
import { mapActions } from 'vuex';
import { CheckList as CheckListModel } from '../models';

export default {
  name: 'TemplateItem',
  props: {
    value: {
      type: Object,
      required: true,
    },
    to: {
      type: String,
      default: '',
    },
  },
  computed: {
    tags() {
      return `${this.value.tags.reduce((carry, val) => `${carry}#${val} `, '')} `;
    },
    state() {
      return CheckListModel.listStates(this.value);
    },
  },
  methods: {
    ...mapActions([
      'deleteTemplate',
    ]),
    edit({ reset }) {
      reset();
      this.$router.push(`/templates/${this.value.id}?enableEdit=1`);
    },
    remove({ reset }) {
      reset();
      this.$q.dialog({
        title: 'Delete Template?',
        message: 'This cannot be undone!',
        ok: {
          label: 'Delete',
          color: 'negative',
          flat: true,
        },
        cancel: true,
        className: 'dialog-flat',
      }).onOk(() => {
        this.deleteTemplate(this.value);
      });
    },
  },
};
</script>
