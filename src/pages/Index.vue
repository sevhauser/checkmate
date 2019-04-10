<template>
  <q-page class="cm-page">
    <q-list class="q-px-xs q-py-xs check-list-list">
      <CheckListItem
        :to="`/list/${checklist.id}`"
        v-for="checklist in checklistOpen"
        :key="checklist.id"
        :value="checklist"/>
      <template v-if="checklistComplete.length > 0">
        <q-item-label header>COMPLETED</q-item-label>
        <CheckListItem
          :to="`/list/${checklist.id}`"
          v-for="checklist in checklistComplete"
          :key="checklist.id"
          :value="checklist"/>
      </template>
    </q-list>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { extend } from 'quasar';
import { CheckList as CheckListModel } from '../models';
import CheckListItem from '../components/CheckListItem.vue';

export default {
  name: 'PageIndex',
  components: {
    CheckListItem,
  },
  computed: {
    ...mapState([
      'checklists',
      'templates',
      'checklistFilter',
    ]),
    checklistList() {
      const { sort } = this.checklistFilter;
      const checklists = extend(true, [], this.checklists)
        .map((el) => {
          el.state = CheckListModel.listStates(el);
          return el;
        });
      return checklists.filter((el) => {
        if (this.checklistFilter.tag !== ''
          && !el.tags.includes(this.checklistFilter.tag)) {
          return false;
        }
        return this.checklistFilter.filter[el.state.state];
      }).sort((a, b) => {
        if (a[sort.key] > b[sort.key]) {
          return sort.dir;
        }
        if (a[sort.key] < b[sort.key]) {
          return (-1) * sort.dir;
        }
        return 0;
      });
    },
    checklistOpen() {
      return this.checklistList.filter(el => el.state.state !== 'done');
    },
    checklistComplete() {
      return this.checklistList.filter(el => el.state.state === 'done');
    },
  },
};
</script>
