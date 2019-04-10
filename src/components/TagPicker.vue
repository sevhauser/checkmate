<template>
  <q-card
    flat>
    <q-card-section>
      <div class="text-h6">Manage Tags</div>
      <q-select
        v-model="tagsModel"
        use-input
        use-chips
        multiple
        clearable
        hide-dropdown-icon
        input-debounce="0"
        :options="options"
        @new-value="newValue"
        new-value-mode="add-unique"/>
    </q-card-section>
    <q-card-actions>
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
import { mapState } from 'vuex';

export default {
  name: 'TagPicker',
  data: () => ({
    tagsModel: [],
    options: [],
  }),
  props: {
    value: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapState([
      'tags',
    ]),
  },
  methods: {
    save() {
      this.$emit('input', this.tagsModel);
      this.$emit('close');
    },
    newValue(val, done) {
      this.options.push(val);
      done(val);
    },
  },
  mounted() {
    if (this.value !== null) {
      this.tagsModel = this.value;
    }
    this.options = [...this.tags];
  },
};
</script>
