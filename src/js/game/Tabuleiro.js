import { Peca, CasaTabuleiro } from './model.js';

export default class Tabuleiro {
    constructor() {
        this.inicio = null;
        this.fim = null;
        this.tamanho = 0;
    }

    incluirDoInicio(novaPeca) {
        const novaCasa = new CasaTabuleiro(novaPeca);

        if (this.tamanho === 0) {
            this.inicio = novaCasa;
            this.fim = novaCasa;
            this.tamanho++;
            return 0;
        }

        if (this.inicio.peca.esquerda === novaPeca.direita) {
            novaCasa.proximo = this.inicio;
            this.inicio.anterior = novaCasa;
            this.inicio = novaCasa;
            this.tamanho++;
            return 2;
        }
        if (this.inicio.peca.esquerda === novaPeca.esquerda) {
            return this.incluirDoInicio(novaPeca.inverter());
        }

        if (this.fim.peca.direita === novaPeca.esquerda) {
            novaCasa.anterior = this.fim;
            this.fim.proximo = novaCasa;
            this.fim = novaCasa;
            this.tamanho++;
            return 1;
        }
        if (this.fim.peca.direita === novaPeca.direita) {
            return this.incluirDoInicio(novaPeca.inverter());
        }

        let ponteiro = this.inicio;
        for (let i = 0; i < this.tamanho - 1; i++) {
            let casaAtual = ponteiro;
            let casaSeguinte = ponteiro.proximo;

            if (casaAtual.peca.direita === novaPeca.esquerda && casaSeguinte.peca.esquerda === novaPeca.direita) {
                casaAtual.proximo = novaCasa;
                novaCasa.anterior = casaAtual;
                novaCasa.proximo = casaSeguinte;
                casaSeguinte.anterior = novaCasa;
                this.tamanho++;
                return this.tamanho - 1 - i - 1;
            }
            if (casaAtual.peca.direita === novaPeca.direita && casaSeguinte.peca.esquerda === novaPeca.esquerda) {
                return this.incluirDoInicio(novaPeca.inverter());
            }
            ponteiro = ponteiro.proximo;
        }

        return -1;
    }

    incluirDoFim(novaPeca) {
        const novaCasa = new CasaTabuleiro(novaPeca);

        if (this.tamanho === 0) {
            this.inicio = novaCasa;
            this.fim = novaCasa;
            this.tamanho++;
            return 0;
        }

        if (this.fim.peca.direita === novaPeca.esquerda) {
            novaCasa.anterior = this.fim;
            this.fim.proximo = novaCasa;
            this.fim = novaCasa;
            this.tamanho++;
            return 1;
        }
        if (this.fim.peca.direita === novaPeca.direita) {
            return this.incluirDoFim(novaPeca.inverter());
        }

        if (this.inicio.peca.esquerda === novaPeca.direita) {
            novaCasa.proximo = this.inicio;
            this.inicio.anterior = novaCasa;
            this.inicio = novaCasa;
            this.tamanho++;
            return 2;
        }
        if (this.inicio.peca.esquerda === novaPeca.esquerda) {
            return this.incluirDoFim(novaPeca.inverter());
        }

        let ponteiro = this.fim;
        for (let i = this.tamanho - 1; i > 0; i--) {
            let casaAtual = ponteiro.anterior;
            let casaSeguinte = ponteiro;

            if (casaAtual.peca.direita === novaPeca.esquerda && casaSeguinte.peca.esquerda === novaPeca.direita) {
                casaAtual.proximo = novaCasa;
                novaCasa.anterior = casaAtual;
                novaCasa.proximo = casaSeguinte;
                casaSeguinte.anterior = novaCasa;
                this.tamanho++;
                return this.tamanho - i;
            }
            if (casaAtual.peca.direita === novaPeca.direita && casaSeguinte.peca.esquerda === novaPeca.esquerda) {
                return this.incluirDoFim(novaPeca.inverter());
            }
            ponteiro = ponteiro.anterior;
        }

        return -1;
    }

    imprimir() {
        if (this.tamanho === 0) {
            console.log('Tabuleiro atual: Vazio');
            return;
        }
        let resultado = [];
        let ponteiro = this.inicio;
        while (ponteiro !== null) {
            resultado.push(ponteiro.peca.toString());
            ponteiro = ponteiro.proximo;
        }
        console.log('Tabuleiro atual:', resultado.join(' '));
    }
}