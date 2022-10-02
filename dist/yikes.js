const createStylesheet = () => {
  const sheet = document.createElement('style');
  sheet.innerHTML = `
    .container {
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.6); 
      margin: auto;
      padding: 2em 4em;
      width: 80%;
      border-radius: 10px;
      z-index: 1000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .monoFont {
        font-family: monospace;
    }

    .header {
      font-size: 36pt;
    }

    .errorLine {
      font-size: 20pt;
    }

    .stackLines {
      font-size: 16pt;
      font-family: sans-serif;
    }
    `;

  document.body.appendChild(sheet);
};

const getTagline = () => {
  const tags = [
    'Your code isn\'t mad at you, it\'s mad with you',
    'Do it the same, but better!',
    'It’s giving “not great”',
    'Oh, you thought you ate?',
    'git gud',
    'Oof',
    'Yikes! :/',
    'This ain’t it',
    'Ruh Roh, Raggy',
    'Ya blew it!',
    'Never should have come here!',
    'We were all rooting for you!',
    'womp womp',
    'No no no! Not like that!',
    'Sit',
    'Well that was fun',
  ];

  const min = 0;
  const max = tags.length - 1;

  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return tags[index];
};

const createElement = (type, event) => {

  switch (type) {
  case 'header':
    const header = document.createElement('h1');
    header.innerText = getTagline();
    header.classList.add('monoFont', 'header');
    return header;

  case 'error':
    const { message, lineno, colno, filename } = event;

    const errorLine = document.createElement('h2');
    errorLine.innerText = `${message} in ${filename.slice(7)} at ${lineno}:${colno}`;
    errorLine.classList.add('monoFont', 'errorLine');
    return errorLine;

  case 'stack':
    const { error } = event;

    const stackLines = document.createElement('p');
    stackLines.innerText = error.stack;
    stackLines.classList.add('stackLines');
    return stackLines;
  }
};

const createWindow = (event) => {
  const container = document.createElement('div');
  container.classList.add('container');

  const header = createElement('header');
  const errorLine = createElement('error', event);
  const stackLines = createElement('stack', event);

  container.appendChild(header);
  container.appendChild(errorLine);
  container.appendChild(stackLines);
  document.body.appendChild(container);
};

window.addEventListener('error', (event) => {
  createStylesheet();
  getTagline();
  createWindow(event);
});