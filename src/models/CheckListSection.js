import ModelGenerator from './ModelGenerator';
import CheckListItem from './CheckListItem';

class CheckListSection extends ModelGenerator {
  static type() {
    return 'clsection';
  }

  static modelValues() {
    return [
      { key: 'id', value: this.uid() },
      { key: 'title', value: '' },
      { key: 'items', value: [] },
    ];
  }

  static sectionStates(section) {
    const result = {
      itemCount: 0,
      itemCompleteCount: 0,
    };
    section.items.forEach((el) => {
      const itemStates = CheckListItem.itemStates(el);
      result.itemCount += itemStates.itemCount;
      result.itemCompleteCount += itemStates.itemCompleteCount;
    });
    return result;
  }
}

export default CheckListSection;
