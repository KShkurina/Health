import app from './api/app.js';
import { generateRandomCards } from './functions/utils.js';
import './functions/mobile-menu.js';
app.token = localStorage.getItem('token') || null
// || '8d5fb4ac-da9a-4d23-9e48-c99e0da89df1'; // default dev token
window.app = app;

// import { sendNewCardReq, sendClearCardsReq } from './api/api.js';
// generateRandomCards(15, false).forEach(e => sendNewCardReq(e)); // random cards generator