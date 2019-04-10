import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import mutations from './mutations';
import actions from './actions';
import state from './state';
import getters from './getters';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'checkmate',
});

export default new Vuex.Store({
  strict: process.env.DEV,
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin],
});
