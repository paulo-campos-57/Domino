import Tabuleiro from './tabuleiro.js';

const meuJogo = new Tabuleiro();
meuJogo.imprimir();

console.log("\n-> Incluindo peça {5, 2}");
let retorno = meuJogo.incluirDoInicio({ esq: 5, dir: 2 });
console.log(`Retorno do método: ${retorno}`);
meuJogo.imprimir();

console.log("\n-> Incluindo peça {2, 6}");
retorno = meuJogo.incluirDoInicio({ esq: 2, dir: 6 });
console.log(`Retorno do método: ${retorno}`);
meuJogo.imprimir();

console.log("\n-> Incluindo peça {1, 5}");
retorno = meuJogo.incluirDoInicio({ esq: 1, dir: 5 });
console.log(`Retorno do método: ${retorno}`);
meuJogo.imprimir();

console.log("\n-> Incluindo peça {2, 2}");
retorno = meuJogo.incluirDoInicio({ esq: 2, dir: 2 });
console.log(`Retorno do método: ${retorno}`);
meuJogo.imprimir();

console.log("\n-> Incluindo peça {4, 4}");
retorno = meuJogo.incluirDoInicio({ esq: 4, dir: 4 });
console.log(`Retorno do método: ${retorno}`);
meuJogo.imprimir();