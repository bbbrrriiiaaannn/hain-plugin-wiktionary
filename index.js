'use strict';

const wiktionary = require("wiktionary-node");
const resultHtmlTemplate = require("./result-html-template");

module.exports = (pluginContext) => {
  const logger = pluginContext.logger;
  const shell = pluginContext.shell;
  const languageId = () => pluginContext.preferences.get('language').split(':')[0]; // dynamic so we don't have to listen for changes

  function startup() {
  }

  function search(query, res) {
    logger.log(query)

    res.add({
      id: 'temp',
      payload: query,
      title: 'Searching Wiktionary...',
      preview: false
    });

    wiktionary(query, languageId()).then(wordJson => {
      res.remove('temp')
      const searchResult = {
        id: 'word',
        payload: wordJson,
        title: query,
        desc: wordJson.definitions[0].lines[0].define,
        preview: true
      };

      logger.log(searchResult)
      res.add(searchResult)
    })
  }

  function execute(id, payload) {
    shell.openExternal(`https://${languageId()}.wiktionary.org/wiki/${payload.word}`);
  }
  
  function renderPreview(id, payload, render) {
    render(resultHtmlTemplate(payload));
  }
  
  return { startup, search, execute, renderPreview };
};
