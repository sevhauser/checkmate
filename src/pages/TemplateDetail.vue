<template>
  <q-page class="cm-page flex column check-list-view">
    <CheckListHeader
      v-model="template"
      :edit="edit"
      class="check-list-view__header"/>
    <q-list class="check-list-view__container">
      <CheckListSection
        v-for="(section, sectionIndex) in template.sections"
        v-model="template.sections[sectionIndex]"
        :key="section.id"
        disable
        :hide-remove="template.sections.length === 1"/>
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
          @click="tagDialog = true"
          icon="mdi-tag-multiple"/>
      </q-toolbar>
    </q-toolbar>
    <q-dialog
      content-class="dialog-flat"
      persistent
      v-model="tagDialog">
      <TagPicker
        @close="tagDialog = false"
        v-model="template.tags"/>
    </q-dialog>
  </q-page>
</template>

<script>
import { extend } from 'quasar';
import { mapGetters, mapActions } from 'vuex';
import CheckListHeader from '../components/CheckListHeader.vue';
import CheckListSection from '../components/CheckListSection.vue';
import IconButton from '../components/IconButton.vue';
import TagPicker from '../components/TagPicker.vue';

export default {
  name: 'TemplateDetail',
  components: {
    CheckListHeader,
    CheckListSection,
    IconButton,
    TagPicker,
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
    template: null,
    edit: false,
    tagDialog: false,
  }),
  computed: {
    ...mapGetters([
      'getTemplate',
    ]),
  },
  methods: {
    ...mapActions([
      'deleteTemplate',
      'updateTemplate',
    ]),
    deleteDialog() {
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
        this.deleteTemplate(this.template).then(() => {
          this.$router.replace('/templates');
        });
      });
    },
    editComplete() {
      this.handleUpdate();
      this.edit = false;
    },
    handleUpdate() {
      this.updateTemplate(extend(true, {}, this.template));
    },
    back() {
      this.$router.back();
    },
  },
  created() {
    this.template = extend(true, {}, this.getTemplate(this.id));
    this.edit = this.enableEdit;
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
