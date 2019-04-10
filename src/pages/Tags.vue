<template>
  <q-page class="cm-page">
    <q-list class="q-px-xs q-py-xs check-list-list">
      <TagItem
        v-for="tag in tagList"
        :key="tag"
        :tag="tag"/>
    </q-list>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { extend } from 'quasar';
import TagItem from '../components/TagItem.vue';

export default {
  name: 'Tags',
  components: {
    TagItem,
  },
  computed: {
    ...mapState([
      'tags',
    ]),
    tagList() {
      const tags = extend([], this.tags);
      return tags.sort();
    },
  },
};
</script>
