<template>
  <q-card
    flat>
    <q-date
      v-model="date"
      today-btn/>
    <q-card-actions>
      <q-btn
        @click="clear"
        flat>Clear</q-btn>
      <q-space/>
      <q-btn
        flat
        v-close-popup>Cancel</q-btn>
      <q-btn
        flat
        @click="save">Save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { date } from 'quasar';

export default {
  name: 'DatePicker',
  data: () => ({
    date: null,
  }),
  props: ['value'],
  methods: {
    clear() {
      this.$emit('clear');
    },
    save() {
      this.$emit('input', date.formatDate(this.date, 'YYYY-MM-DD'));
      this.$emit('close');
    },
  },
  mounted() {
    if (this.value !== null) {
      this.date = this.value;
    } else {
      this.date = date.formatDate(new Date(), 'YYYY/MM/DD');
    }
  },
};
</script>
