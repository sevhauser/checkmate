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
      :class="`check-list-item--${state.state}`"
      :to="to">
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
          <span>{{ state.itemCompleteCount }} / {{ state.itemCount }}</span>
          <span
            v-if="dueDate !== ''"
            class="q-ml-sm"><q-icon
            name="mdi-brightness-1"
            size="6px"/> {{ dueDate }}</span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script>
import { mapActions } from 'vuex';
import { date } from 'quasar';
import { CheckList as CheckListModel } from '../models';

export default {
  name: 'CheckListItem',
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
    ...mapActions([
      'deleteChecklist',
    ]),
    edit({ reset }) {
      reset();
      this.$router.push(`/list/${this.value.id}?enableEdit=1`);
    },
    remove({ reset }) {
      reset();
      this.$q.dialog({
        title: 'Delete Checklist?',
        message: 'This cannot be undone!',
        ok: {
          label: 'Delete',
          color: 'negative',
          flat: true,
        },
        cancel: true,
        className: 'dialog-flat',
      }).onOk(() => {
        this.deleteChecklist(this.value);
      });
    },
  },
};
</script>
