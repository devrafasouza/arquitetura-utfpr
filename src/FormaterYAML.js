import AbstractFormater from './AbstractFormater.js';

export default class FormaterYAML extends AbstractFormater {
  output(cities) {
    let yaml = '';

    for (let i = 0; i < cities.length; i++) {
      yaml += `- Nome: ${cities[i]['Nome']}\n`;
    }

    return yaml;
  }
}