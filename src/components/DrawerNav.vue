<template>
  <div class="cm-nav-container"
    :class="{
      'cm-nav-container--active': showNav,
      'cm-nav-container--bg-active': showBg,
    }">
    <q-card
      class="cm-nav"
      :class="{ 'cm-nav--active': showNav }"
      flat>
      <q-list
        dark>
        <q-item class="cm-nav__header">
          <img src="statics/checkmate-logo.svg">
        </q-item>
        <q-item
          v-for="(entry, index) in navEntries"
          :key="index"
          :to="entry.to">
          <q-item-section side>
            <q-icon
              size="18px"
              :name="entry.icon"/>
          </q-item-section>
          <q-item-section>{{ entry.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'DrawerNav',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    showNav: false,
    showBg: false,
  }),
  computed: {
    navEntries() {
      return [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        }, {
          icon: 'mdi-file-multiple',
          title: 'Templates',
          to: '/templates',
        }, {
          icon: 'mdi-tag-multiple',
          title: 'Tags',
          to: '/tags',
        },
      ];
    },
  },
  watch: {
    value(value) {
      if (value) {
        this.showBg = true;
        Vue.nextTick().then(() => {
          this.showNav = true;
        });
      } else {
        this.showNav = false;
        setTimeout(() => {
          this.showBg = false;
        }, 200);
      }
    },
  },
  mounted() {
    this.showNav = this.value;
    this.showBg = this.value;
  },
};
</script>
