import app from './app.js';
const apiUrl = 'https://ajax.test-danit.com/api/v2/cards/';

/**
 * @async function for retrieving all cards for auth. user
 * @param {string} tkn - token, if omitted - takes token from credentials
 * @returns {Promise<Array|false>} array of cards
 */
export const sendGetAllCardsReq = async () => {
  if (app.token === null) return [];
  const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${app.token}`
      }
    })
    .then(resp => {
      if (resp.status === 200) return resp.json();
      console.log(resp.status);
      return false;
    });

  return response;
}

/**
 * @async function for creating card
 * @param {object} body
 * @returns {Promise<object|false>} card with id
 */
export const sendNewCardReq = async (body) => {
  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${app.token}`
      },
      body: JSON.stringify(body)
    })
    .then(resp => {
      if (resp.status === 200) return resp.json();
      console.log(resp.status);
      return false;
    });

  return response;
}

/**
 * @async function for changing card
 * @param {number} id
 * @param {object} body
 * @returns {Promise<object|false>} card with id
 */
 export const sendChangeCardReq = async (id, body) => {
  const response = await fetch(apiUrl + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${app.token}`
      },
      body: JSON.stringify(body)
    })
    .then(resp => {
      if (resp.status === 200) return resp.json();
      console.log(resp.status);
      return false;
    });

  return response;
}

/**
 * @async function for remove single card
 * @param {number} id id of a card to delete 
 * @returns {Promise<boolean>}
 */
export const sendDeleteCardReq = async (id = 0) => {
  const response = await fetch(apiUrl + id, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${app.token}`
    },})
    .then(resp => {
      if (resp.status === 200) return true;
      console.log(resp.status);
      return false;
    });

  return response;
}


/**
 * @async function that deletes all cards
 * @returns {Promise<boolean>}
 */

export const sendClearCardsReq = async () => {
  const cards = await sendGetAllCardsReq();

  if (!Array.isArray(cards)) return false;
  if (cards.length === 0) return true;

  const result = await Promise.allSettled(cards.map(({id}) =>
    sendDeleteCardReq(id)));

  return true;
}

/**
 * @async function for authorization
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string|false>} string with token or false;
 */
export const getTokenReq = async (email, password) => {
  const response = await fetch(apiUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(resp => resp.status !== 200 ? false : resp.text());
  return response;
}

export default {
  sendGetAllCardsReq,
  sendNewCardReq,
  sendChangeCardReq,
  sendDeleteCardReq,
  sendClearCardsReq,
  getTokenReq
}