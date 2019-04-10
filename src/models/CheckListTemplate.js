import { extend } from 'quasar';
import ModelGenerator from './ModelGenerator';

export default class CheckListTemplate extends ModelGenerator {
  static type() {
    return 'template';
  }

  static fromChecklist(checklist, title = '') {
    const result = extend(true, {}, checklist);
    result.id = this.uid();
    result.type = this.type();
    result.title = title !== '' ? title : result.title;
    result.sections = result.sections.map(el => this.uncheck(el));
    result.createdAt = Date.now();
    result.updatedAt = Date.now();
    return result;
  }

  static uncheck(element) {
    const result = element;
    if (result.done !== undefined) {
      result.done = false;
    }
    if (result.items.length > 0) {
      result.items = result.items.map(el => this.uncheck(el));
    }
    return result;
  }
}
