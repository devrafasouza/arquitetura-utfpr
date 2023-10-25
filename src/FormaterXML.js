import AbstractFormater from './AbstractFormater.js';

export default class FormaterXML extends AbstractFormater {

  output(cities) {
    let xml = '<cities>\n';

    for (let i = 0; i < cities.length; i++) {
      xml += `  <city>${cities[i]['Nome']}</city>\n`;
    }

    xml += '</cities>';
    
    return xml;
  }
}