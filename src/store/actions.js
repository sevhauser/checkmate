import * as MUTATIONS from './mutation-types';
import {
  CheckList,
  CheckListSection,
  CheckListItem,
} from '../models';

export default {
  // Checklists
  async newChecklist({ dispatch }) {
    const section = CheckListSection.create();
    section.items.push(CheckListItem.create());
    const checklist = CheckList.create();
    checklist.sections.push(section);
    await dispatch('createChecklist', checklist);
    return checklist.id;
  },
  async createChecklist({ commit }, checklist) {
    if (checklist.type !== 'cl') {
      throw new Error('Invalid argument: object is not a checklist');
    }
    commit(MUTATIONS.ADD_CHECKLIST, checklist);
    commit(MUTATIONS.FIND_TAGS);
    return checklist.id;
  },
  async updateChecklist({ commit }, checklist) {
    if (checklist.type !== 'cl') {
      throw new Error('Invalid argument: object is not a checklist');
    }
    commit(MUTATIONS.UPDATE_CHECKLIST, checklist);
    commit(MUTATIONS.FIND_TAGS);
  },
  async deleteChecklist({ commit }, checklist) {
    if (checklist.type !== 'cl') {
      throw new Error('Invalid argument: object is not a checklist');
    }
    commit(MUTATIONS.DELETE_CHECKLIST, checklist);
  },
  // Templates
  async createTemplate({ commit }, template) {
    if (template.type !== 'template') {
      throw new Error('Invalid argument: object is not a checklist');
    }
    commit(MUTATIONS.ADD_TEMPLATE, template);
    return template;
  },
  async updateTemplate({ commit }, template) {
    if (template.type !== 'template') {
      throw new Error('Invalid argument: object is not a checklist');
    }
    commit(MUTATIONS.UPDATE_TEMPLATE, template);
  },
  async deleteTemplate({ commit }, template) {
    if (template.type !== 'template') {
      throw new Error('Invalid argument: object is not a checklist');
    }
    commit(MUTATIONS.DELETE_TEMPLATE, template);
  },
  // Tags
  async createTag({ commit }, tag) {
    commit(MUTATIONS.ADD_TAG, tag);
  },
  async updateTag({ commit }, tag) {
    commit(MUTATIONS.UPDATE_TAG, tag);
  },
  async deleteTag({ commit }, tag) {
    commit(MUTATIONS.DELETE_TAG, tag);
  },
  // Filter
  setChecklistFilterSort({ commit }, sort) {
    commit(MUTATIONS.SET_CHECKLIST_FILTER_SORT, sort);
  },
  setChecklistFilterFilter({ commit }, filter) {
    commit(MUTATIONS.SET_CHECKLIST_FILTER_FILTER, filter);
  },
  setChecklistFilterTag({ commit }, tag) {
    commit(MUTATIONS.SET_CHECKLIST_FILTER_TAG, tag);
  },
};
