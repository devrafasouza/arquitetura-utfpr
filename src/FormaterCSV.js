import AbstractFormater from './AbstractFormater.js';

export default class FormaterCSV extends AbstractFormater {

  output(cities) {
    let csv = 'Nome\n';

    for (let i = 0; i < cities.length; i++) {
      csv += `"${cities[i]['Nome']}"\n`;
    }

    return csv;
  }
}
