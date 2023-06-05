const defaultConsole = console.log;
const consoleElm = document.querySelector('#dom-console') || document.createElement('div');
const msgContainer = document.createElement('div');
let parentElm = document.body;

consoleElm.id = 'dom-console';
consoleElm.innerHTML = '<hr>-----DOM Console-----<hr>';
consoleElm.append(msgContainer);
parentElm.append(consoleElm);

const domConsole = (...msg) => {
  defaultConsole.apply(console, msg);
  if (msg.length > 1 || typeof(msg[0]) === 'object') msg = msg.map(e => JSON.stringify(e)).join(', ');
  msgContainer.insertAdjacentHTML('afterbegin', 
  `<p><strong>${new Date().toLocaleTimeString()}:</strong> ${msg}</p>`);
}

console.log = domConsole;

/**
 * module appends console into document.body or another element
 */
export default {
  show() {
    console.log = domConsole;
    parentElm.append(consoleElm);
  },

  hide() {
    console.log = defaultConsole;
    consoleElm.remove();
  },

  clear() {
    msgContainer.innerHTML = '';
  },

  set parentElm(elm) {
    if (elm instanceof HTMLElement) {
      parentElm = elm;
      parentElm.append(consoleElm);
    }
  },  
  get parentElm() {
    return parentElm;
  }
}