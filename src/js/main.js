import { CabecaPeca, Peca } from './game/model.js';
import Tabuleiro from './game/tabuleiro.js';

console.log("--- Jogo Iniciado com Estrutura de Lista Encadeada ---");

const meuJogo = new Tabuleiro();
meuJogo.imprimir();

const peca1 = new Peca(CabecaPeca.QUINA, CabecaPeca.DUQUE);
const peca2 = new Peca(CabecaPeca.DUQUE, CabecaPeca.SENA);
const peca3 = new Peca(CabecaPeca.PIO, CabecaPeca.QUINA);

console.log(`\n-> Incluindo peça ${peca1.toString()}`);
let retorno = meuJogo.incluirDoInicio(peca1);
console.log(`Retorno do método: ${retorno}`);
meuJogo.imprimir();

console.log(`\n-> Incluindo peça ${peca2.toString()}`);
retorno = meuJogo.incluirDoInicio(peca2);
console.log(`Retorno do método: ${retorno}`);
meuJogo.imprimir();

console.log(`\n-> Incluindo peça ${peca3.toString()}`);
retorno = meuJogo.incluirDoInicio(peca3);
console.log(`Retorno do método: ${retorno}`);
meuJogo.imprimir();