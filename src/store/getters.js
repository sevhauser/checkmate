export default {
  getChecklist: state => id => state.checklists.find(el => el.id === id),
  getTemplate: state => id => state.templates.find(el => el.id === id),
};
