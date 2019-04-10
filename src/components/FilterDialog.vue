<template>
  <q-card
    flat
    class="q-pb-md">
    <q-list
      separator>
      <q-item>
        <q-item-section>
          <q-item-label>Filter Checklists</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            flat
            round
            icon="mdi-close"
            @click="$emit('close')"/>
        </q-item-section>
      </q-item>
      <q-item-label header>Tags</q-item-label>
      <q-item dense>
        <q-item-section class="cm-filter__chips">
          <q-chip
            :selected="tag === ''"
            @click="setTag('')"
            :color="tag === '' ? 'accent' : ''"
            label="All"/>
          <q-chip
            clickable
            v-for="tagEl in tags"
            :key="tagEl"
            :label="`#${tagEl}`"
            :selected="tag === tagEl"
            :color="tag === tagEl ? 'accent' : ''"
            @click="setTag(tagEl)"/>
        </q-item-section>
      </q-item>
      <q-item-label header>Sort</q-item-label>
      <q-item dense>
        <q-item-section side>
          <q-btn
            flat
            round
            @click="toggleSortDir"
            :icon="sort.dir > 0 ? 'mdi-sort-ascending' : 'mdi-sort-descending'"/>
        </q-item-section>
        <q-item-section>
          <q-select
            emit-value
            map-options
            dense
            :value="sort.key"
            :options="sortOptions"
            @input="setSortKey($event)">
          </q-select>
        </q-item-section>
      </q-item>
      <q-item-label header>States</q-item-label>
      <q-item dense>
        <q-item-section
          class="cm-filter__chips">
          <q-chip
            v-for="state in stateOptions"
            :key="state.key"
            :label="state.label"
            :selected="filter[state.key]"
            :color="filter[state.key] ? state.color : ''"
            @click="toggleFilter(state.key)"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'FilterDialog',
  computed: {
    ...mapState([
      'checklistFilter',
      'tags',
    ]),
    filter: {
      get() {
        return this.checklistFilter.filter;
      },
      set(value) {
        this.setChecklistFilterFilter(value);
      },
    },
    sort: {
      get() {
        return this.checklistFilter.sort;
      },
      set(value) {
        this.setChecklistFilterSort(value);
      },
    },
    tag: {
      get() {
        return this.checklistFilter.tag;
      },
      set(value) {
        this.setChecklistFilterTag(value);
      },
    },
    sortOptions() {
      return [
        { label: 'Created At', value: 'createdAt' },
        { label: 'Title', value: 'title' },
        { label: 'Due Date', value: 'dateDue' },
        { label: 'Updated At', value: 'updatedAt' },
      ];
    },
    stateOptions() {
      return [
        { label: 'Pending', key: 'pending', color: 'accent' },
        { label: 'Due today', key: 'due', color: 'orange-8' },
        { label: 'Overdue', key: 'overdue', color: 'negative' },
        { label: 'Completed', key: 'done', color: 'positive' },
      ];
    },
  },
  methods: {
    ...mapActions([
      'setChecklistFilterSort',
      'setChecklistFilterFilter',
      'setChecklistFilterTag',
    ]),
    toggleSortDir() {
      const sort = { ...this.sort };
      sort.dir *= (-1);
      this.sort = sort;
    },
    setSortKey(value) {
      const sort = { ...this.sort };
      sort.key = value;
      this.sort = sort;
    },
    toggleFilter(key) {
      const filter = { ...this.filter };
      filter[key] = !filter[key];
      this.filter = filter;
    },
    setTag(value) {
      this.tag = this.tag === value ? '' : value;
    },
  },
};
</script>
