import FormaterHTML from './src/FormaterHTML.js';
import FormaterTXT from './src/FormaterTXT.js';
import FormaterXML from './src/FormaterXML.js';
import FormaterJSON from './src/FormaterJSON.js';
import FormaterCSV from './src/FormaterCSV.js';
import FormaterYAML from './src/FormaterYAML.js'; // Adicione o módulo FormaterYAML se necessário
import CitiesReporter from './src/CitiesReporter.js';
import fs from 'node:fs';
import inquirer from 'inquirer';
/* import yaml from 'js-yaml'; // Importe o módulo YAML */

const filename = './data/cidades-2.json';

const formaterStrategies = {
  'html': new FormaterHTML(),
  'txt': new FormaterTXT(),
  'xml': new FormaterXML(),
  'json': new FormaterJSON(),
  'csv': new FormaterCSV(),
  'yaml': new FormaterYAML(), // Adicione o novo formato YAML
};

const fileChoices = ['XML', 'CSV', 'YAML', 'HTML', 'JSON'];
const formatChoices = Object.keys(formaterStrategies);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'fileType',
      message: 'Escolha o tipo de arquivo a ser lido:',
      choices: fileChoices,
    },
    {
      type: 'list',
      name: 'formatType',
      message: 'Escolha o formato de saída desejado:',
      choices: formatChoices,
    },
  ])
  .then((answers) => {
    const fileType = answers.fileType.toLowerCase();
    const formatType = answers.formatType.toLowerCase(); // Converta o formato para minúsculas

    // Verifique se o formato de entrada corresponde à extensão do arquivo
    const inputFormat = filename.split('.').pop(); // Obtém a extensão do arquivo
    if (inputFormat !== fileType) {
      console.error(`O formato de entrada do arquivo não corresponde à extensão do arquivo (${inputFormat}). Por favor, escolha novamente.`);
    } else if (!(formatType in formaterStrategies)) {
      console.error(`Formato de saída "${formatType}" não é suportado.`);
    } else {
      const reporter = new CitiesReporter({
        formaterStrategy: formaterStrategies[formatType],
      });

      try {
        if (fileType === 'yaml') {
          // Se o arquivo de entrada for YAML, carregue e converta para JSON
          const yamlData = fs.readFileSync(filename, 'utf8');
          const jsonData = yaml.load(yamlData);
          const output = reporter.report(jsonData, fileType);
          console.log(output);
        } else {
          const output = reporter.report(filename, fileType);
          console.log(output);
        }
      } catch (error) {
        console.error('Um erro ocorreu:', error.message);
      }
    }
  });
