<template>
  <q-page class="cm-page flex column check-list-view">
    <CheckListHeader
      v-model="checklist"
      :edit="edit"
      class="check-list-view__header"/>
    <q-list class="check-list-view__container">
      <draggable
        :list="checklist.sections"
        handle=".cl-handle-section"
        :group="{ name: 'sections' }"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions">
          <CheckListSection
            v-for="(section, sectionIndex) in checklist.sections"
            v-model="checklist.sections[sectionIndex]"
            :key="section.id"
            :edit="edit"
            :hide-remove="checklist.sections.length === 1"
            @remove-section="removeSection(sectionIndex)"
            @add-section="addSection(sectionIndex)"/>
      </draggable>
    </q-list>
    <q-toolbar
      class="list-detail-toolbar">
      <IconButton
        icon="mdi-arrow-left"
        @click="back"/>
      <q-space/>
      <IconButton
        icon="mdi-pencil"
        @click="edit = true"/>
      <q-toolbar
        class="list-detail-toolbar__actions"
        :class="{'list-detail-toolbar__actions--active': edit}">
        <IconButton
          @click="editComplete"
          icon="mdi-check"/>
          <q-space/>
        <IconButton
          @click="deleteDialog"
          icon="mdi-delete"/>
        <IconButton
          @click="templateDialog"
          icon="mdi-file-plus"/>
        <IconButton
          @click="dateDialog = true"
          icon="mdi-calendar-clock"/>
        <IconButton
          @click="tagDialog = true"
          icon="mdi-tag-multiple"/>
      </q-toolbar>
    </q-toolbar>
    <q-dialog
      content-class="dialog-flat"
      v-model="dateDialog">
      <DatePicker
        v-model="checklist.dateDue"
        @close="dateDialog = false"
        @clear="clearDate"/>
    </q-dialog>
    <q-dialog
      content-class="dialog-flat"
      persistent
      v-model="tagDialog">
      <TagPicker
        @close="tagDialog = false"
        v-model="checklist.tags"/>
    </q-dialog>
  </q-page>
</template>

<script>
import draggable from 'vuedraggable';
import { date, extend } from 'quasar';
import { mapGetters, mapActions } from 'vuex';
import CheckListHeader from '../components/CheckListHeader.vue';
import CheckListSection from '../components/CheckListSection.vue';
import IconButton from '../components/IconButton.vue';
import DatePicker from '../components/DatePicker.vue';
import TagPicker from '../components/TagPicker.vue';
import {
  CheckListSection as CheckListSectionModel,
  CheckListItem as CheckListItemModel,
  CheckListTemplate as CheckListTemplateModel,
} from '../models';

export default {
  name: 'ListDetail',
  components: {
    CheckListHeader,
    CheckListSection,
    IconButton,
    DatePicker,
    TagPicker,
    draggable,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    enableEdit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    checklist: null,
    edit: false,
    drag: false,
    dateDialog: false,
    tagDialog: false,
  }),
  computed: {
    ...mapGetters([
      'getChecklist',
    ]),
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    today() {
      return date.formatDate(Date.now(), 'YYYY-MM-DD');
    },
  },
  methods: {
    ...mapActions([
      'updateChecklist',
      'deleteChecklist',
      'createTemplate',
    ]),
    addSection(sectionIndex) {
      const section = CheckListSectionModel.create();
      section.items.push(CheckListItemModel.create());
      this.checklist.sections.splice(sectionIndex + 1, 0, section);
    },
    removeSection(sectionIndex) {
      this.checklist.sections.splice(sectionIndex, 1);
    },
    clearDate() {
      this.checklist.dateDue = null;
      this.dateDialog = false;
    },
    templateDialog() {
      this.$q.dialog({
        title: 'New Template',
        prompt: {
          model: this.checklist.title,
        },
        cancel: true,
        className: 'dialog-flat',
      }).onOk((title) => {
        const template = CheckListTemplateModel.fromChecklist(this.checklist, title);
        this.createTemplate(template);
      });
    },
    deleteDialog() {
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
        this.deleteChecklist(this.checklist).then(() => {
          this.$router.replace('/');
        });
      });
    },
    handleUpdate() {
      this.updateChecklist(extend(true, {}, this.checklist));
    },
    editComplete() {
      this.handleUpdate();
      this.edit = false;
    },
    back() {
      this.$router.back();
    },
  },
  created() {
    this.checklist = extend(true, {}, this.getChecklist(this.id));
    this.edit = this.enableEdit;
    this.$root.$on('checked', this.handleUpdate);
  },
};
</script>

<style lang="stylus">
  @import '~src/css/ffs.variables.styl'
  .check-list-view
    &__header
      margin $list-padding
    &__container
      background-color $white
      margin 0 $list-padding
      padding-top $list-padding
      flex 1 1 auto
      padding-bottom 50px

  .list-detail-toolbar
    position fixed
    bottom 0
    left 0
    width 100%
    z-index 10
    background-color $primary
    &__actions
      width 100%
      height 100%
      position absolute;
      left 0
      bottom -100%
      background-color $primary
      transition bottom 200ms ease-in-out
      &--active
        bottom 0
</style>
