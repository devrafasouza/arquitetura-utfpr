import AbstractFormater from './AbstractFormater.js';

export default class FormaterJSON extends AbstractFormater {

  output(cities) {
    return JSON.stringify(cities, null, 2);
  }
}
