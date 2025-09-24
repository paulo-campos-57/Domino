import JogoController from './game/JogoController.js';

const urlParams = new URLSearchParams(window.location.search);

const modoDeJogo = urlParams.get('modo');

const jogo = new JogoController();

jogo.iniciarJogo(modoDeJogo);