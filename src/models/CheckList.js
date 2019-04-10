import { date, extend } from 'quasar';
import ModelGenerator from './ModelGenerator';
import CheckListSection from './CheckListSection';

export default class CheckList extends ModelGenerator {
  static type() {
    return 'cl';
  }

  static modelValues() {
    return [
      { key: 'title', value: '' },
      { key: 'sections', value: [] },
      { key: 'tags', value: [] },
      { key: 'dateDue', value: null },
      { key: 'createdAt', value: Date.now() },
      { key: 'updatedAt', value: Date.now() },
    ];
  }

  static fromTemplate(template) {
    const result = extend(true, {}, template);
    result.type = this.type();
    result.id = this.uid();
    result.createdAt = Date.now();
    result.updatedAt = Date.now();
    return result;
  }

  static listStates(checklist) {
    const result = {
      state: 'pending',
      itemCount: 0,
      itemCompleteCount: 0,
    };
    checklist.sections.forEach((el) => {
      const sectionState = CheckListSection.sectionStates(el);
      result.itemCount += sectionState.itemCount;
      result.itemCompleteCount += sectionState.itemCompleteCount;
    });
    if (result.itemCount === result.itemCompleteCount) {
      result.state = 'done';
    } else if (checklist.dateDue !== null) {
      const diff = date.getDateDiff(checklist.dateDue, new Date(), 'days');
      if (diff === 0) {
        result.state = 'due';
      } else if (diff < 0) {
        result.state = 'overdue';
      }
    }
    return result;
  }
}
