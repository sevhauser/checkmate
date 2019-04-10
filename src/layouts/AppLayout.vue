<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
      <DrawerNav
        v-model ="drawerOpen"/>
      <q-toolbar class="cm-toolbar">
        <q-icon
          class="cm-toolbar__arrow"
          :class="{ 'cm-toolbar__arrow--active': drawerOpen }"
          color="white"
          name="mdi-menu-up"/>
        <q-btn
          flat
          round
          @click="toggleMenu"
          class="cm-toolbar__menu">
          <img class="cm-toolbar__logo" src="assets/checkmate-logo-icon.svg">
        </q-btn>
        <q-space/>
        <q-btn
          class="cm-toolbar__fab"
          :class="{ 'cm-toolbar__fab--active': $route.path === '/' && !drawerOpen }"
          fab
          unelevated
          color="accent"
          icon="mdi-plus"
          @click="createNewChecklist"/>
        <template
          v-if="$route.path === '/'">
          <q-btn
            v-if="templates.length > 0"
            flat
            round
            color="white"
            @click="fromTemplate"
            icon="mdi-file-check"/>
          <q-btn
            color="white"
            flat
            round
            @click="filterDialog = true"
            icon="mdi-filter-variant"/>
        </template>
      </q-toolbar>
    </q-page-container>
    <q-dialog
      position="bottom"
      seamless
      v-model="filterDialog">
      <FilterDialog
        @close="filterDialog = false"/>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { CheckList as CheckListModel } from '../models';
import DrawerNav from '../components/DrawerNav.vue';
import FilterDialog from '../components/FilterDialog.vue';

export default {
  name: 'AppLayout',
  components: {
    DrawerNav,
    FilterDialog,
  },
  data: () => ({
    drawerOpen: false,
    filterDialog: false,
  }),
  computed: {
    ...mapState([
      'templates',
    ]),
    ...mapGetters([
      'getTemplate',
    ]),
    templateOptions() {
      return this.templates.map(el => ({
        label: el.title,
        value: el.id,
      }));
    },
  },
  methods: {
    ...mapActions([
      'newChecklist',
      'createChecklist',
    ]),
    toggleMenu() {
      this.drawerOpen = !this.drawerOpen;
    },
    createNewChecklist() {
      this.$q.loading = true;
      this.newChecklist().then((id) => {
        this.$q.loading = false;
        this.$router.push(`/list/${id}?enableEdit=1`);
      });
    },
    createChecklistFromTemplate(templateId) {
      if (templateId === 'none') {
        return;
      }
      this.$q.loading = true;
      const result = CheckListModel.fromTemplate(this.getTemplate(templateId));
      this.createChecklist(result).then((id) => {
        this.$q.loading = false;
        this.$router.push(`/list/${id}?enableEdit=1`);
      });
    },
    fromTemplate() {
      this.$q.dialog({
        title: 'From Template',
        message: 'Select template',
        className: 'dialog-flat',
        options: {
          type: 'radio',
          model: 'none',
          items: this.templateOptions,
        },
        cancel: true,
      }).onOk((res) => {
        this.createChecklistFromTemplate(res);
      });
    },
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.drawerOpen = false;
      this.filterDialog = false;
      next();
    });
  },
};
</script>

<style>
</style>
