import ModelGenerator from './ModelGenerator';

class CheckListItem extends ModelGenerator {
  static type() {
    return 'clitem';
  }

  static modelValues() {
    return [
      { key: 'title', value: '' },
      { key: 'description', value: '' },
      { key: 'done', value: false },
      { key: 'target', value: '' },
      { key: 'items', value: [] },
    ];
  }

  static itemStates(item) {
    const result = {
      itemCount: 1,
      itemCompleteCount: item.done ? 1 : 0,
    };
    if (item.items.length > 0) {
      item.items.forEach((el) => {
        const itemState = this.itemStates(el);
        result.itemCount += itemState.itemCount;
        result.itemCompleteCount += itemState.itemCompleteCount;
      });
    }
    return result;
  }
}

export default CheckListItem;
