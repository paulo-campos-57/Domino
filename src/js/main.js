import BurrinhoInteligente from './game/BurrinhoInteligente.js';

const jogo = new BurrinhoInteligente();

jogo.iniciarSimulacao();

/*
// Para jogar um turno de cada vez (se fosse interativo):
console.log("\n--- JOGANDO UM TURNO MANUALMENTE ---");
// Jogador 1 escolhe 'inicio'
jogo.jogarTurno('inicio');

// Jogador 2 escolhe 'fim'
jogo.jogarTurno('fim');
*/