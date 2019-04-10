<template>
  <q-page class="cm-page">
    <q-list class="q-px-xs q-py-xs check-list-list">
      <TemplateItem
        v-for="template in templateList"
        :to="`/templates/${template.id}`"
        :key="template.id"
        :value="template"/>
    </q-list>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { extend } from 'quasar';
import TemplateItem from '../components/TemplateItem.vue';

export default {
  name: 'Templates',
  components: {
    TemplateItem,
  },
  computed: {
    ...mapState([
      'templates',
    ]),
    templateList() {
      const templates = extend(true, [], this.templates);
      return templates.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
    },
  },
};
</script>
