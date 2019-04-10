import { uid, extend } from 'quasar';

class ModelGenerator {
  static type() {
    return 'model';
  }

  static modelValues() {
    return [];
  }

  static create() {
    return this.generateModel();
  }

  static extractModelValues(model) {
    const result = {};
    const values = this.modelValues();
    values.forEach((el) => {
      result[el.key] = model[el.key];
    });
    return extend({}, result);
  }

  static generateModel() {
    const result = {
      id: uid(),
      type: this.type(),
    };
    const values = this.modelValues();
    values.forEach((el) => {
      result[el.key] = el.value;
    });
    return extend({}, result);
  }

  static uid() {
    return uid();
  }
}

export default ModelGenerator;
