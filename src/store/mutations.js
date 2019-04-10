
import * as MUTATIONS from './mutation-types';

function updateChecklistsTag(checklists, newTag, oldTag) {
  const lists = checklists;
  lists.forEach((el) => {
    const tagIndex = el.tags.findIndex(tag => tag === oldTag);
    if (tagIndex >= 0) {
      el.tags.splice(tagIndex, 1, newTag);
    }
  });
  return lists;
}

function deleteChecklistsTag(checklists, tag) {
  const lists = checklists;
  lists.forEach((el) => {
    el.tags = el.tags.filter(tagEl => tagEl !== tag);
  });
  return lists;
}

export default {
  // Checklists
  [MUTATIONS.ADD_CHECKLIST](state, checklist) {
    const index = state.checklists.findIndex(el => el.id === checklist.id);
    if (index < 0) {
      state.checklists.push(checklist);
    }
  },
  [MUTATIONS.UPDATE_CHECKLIST](state, checklist) {
    checklist.updatedAt = Date.now();
    const index = state.checklists.findIndex(el => el.id === checklist.id);
    if (index >= 0) {
      state.checklists.splice(index, 1, checklist);
    }
  },
  [MUTATIONS.DELETE_CHECKLIST](state, checklist) {
    state.checklists = state.checklists.filter(el => el.id !== checklist.id);
  },
  // Templates
  [MUTATIONS.ADD_TEMPLATE](state, template) {
    if (!state.templates.some(el => el.id === template.id)) {
      state.templates.push(template);
    }
  },
  [MUTATIONS.UPDATE_TEMPLATE](state, template) {
    const index = state.templates.findIndex(el => el.id === template.id);
    if (index >= 0) {
      state.templates.splice(index, 1, template);
    }
  },
  [MUTATIONS.DELETE_TEMPLATE](state, template) {
    if (state.templates.some(el => el.id === template.id)) {
      state.templates = state.templates.filter(el => el.id !== template.id);
    }
  },
  // Tags
  [MUTATIONS.ADD_TAG](state, tag) {
    if (!state.tags.includes(tag)) {
      state.tags.push(tag);
    }
  },
  [MUTATIONS.UPDATE_TAG](state, { oldTag, newTag }) {
    const index = state.tags.findIndex(el => el === oldTag);
    if (index >= 0) {
      state.tags.splice(index, 1, newTag);
      state.checklists = updateChecklistsTag(state.checklists, oldTag, newTag);
      state.templates = updateChecklistsTag(state.templates, oldTag, newTag);
    }
  },
  [MUTATIONS.DELETE_TAG](state, tag) {
    const index = state.tags.findIndex(el => el === tag);
    if (index >= 0) {
      state.tags.splice(index, 1);
    }
    state.checklists = deleteChecklistsTag(state.checklists, tag);
    state.templates = deleteChecklistsTag(state.templates, tag);
  },
  [MUTATIONS.FIND_TAGS](state) {
    state.checklists.forEach((el) => {
      el.tags.forEach((tag) => {
        if (!state.tags.includes(tag)) {
          state.tags.push(tag);
        }
      });
    });
  },
  // Filter
  [MUTATIONS.SET_CHECKLIST_FILTER_FILTER](state, filter) {
    state.checklistFilter.filter = filter;
  },
  [MUTATIONS.SET_CHECKLIST_FILTER_SORT](state, sort) {
    state.checklistFilter.sort = sort;
  },
  [MUTATIONS.SET_CHECKLIST_FILTER_TAG](state, tag) {
    state.checklistFilter.tag = tag;
  },
};
