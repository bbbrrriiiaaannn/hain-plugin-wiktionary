const style = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: #fcfcfc;
    margin: 1em 20px 5em;
  }

  ol {
    -webkit-padding-start: 20px;
  }

  blockquote {
    -webkit-margin-start: 0;
    border-left: 4px solid black;
    padding-left: 1ex;
    font-style: italic;
  }

  hr {
    border: 4px solid black;
    -webkit-margin-before: 2em;
    -webkit-margin-after: 2em;
  }
`;

const renderDefinitionHtml = ({language, word, definitions}) => `
  <html><body>
    <style>${style}</style>
    <h1>${word}</h1>
    ${definitions.map(renderLineHtml).join('')}
  </body></html>
`;

const renderLineHtml = ({lines, speech}, index) => `
  ${index !== 0 ? '<hr/>':''}
  <i>(${speech})</i>
  <ol>
    ${lines.map(renderEachLineHtml).join('')}
  </ol>
`;

const renderEachLineHtml = ({define, examples}) => `
  <li>${define}</li>
  ${examples.map(renderEachExample).join('')}
`;

const renderEachExample = (example) => `
  <blockquote>${example}</blockquote>
`;

module.exports = renderDefinitionHtml;
