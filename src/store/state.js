
export default {
  checklists: [],
  templates: [],
  tags: [],
  checklistFilter: {
    sort: {
      key: 'updatedAt',
      dir: 1,
    },
    filter: {
      pending: true,
      done: true,
      due: true,
      overdue: true,
    },
    tag: '',
  },
};
