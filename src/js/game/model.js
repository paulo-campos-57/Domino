export const CabecaPeca = Object.freeze({
    BRANCO: 0,
    PIO: 1,
    DUQUE: 2,
    TERNO: 3,
    QUADRA: 4,
    QUINA: 5,
    SENA: 6,
});

const nomesCabecas = ["BRANCO", "PIO", "DUQUE", "TERNO", "QUADRA", "QUINA", "SENA"];

export class Peca {
    constructor(esquerda, direita) {
        this.esquerda = esquerda;
        this.direita = direita;
    }

    inverter() {
        return new Peca(this.direita, this.esquerda);
    }

    toString() {
        return `[${nomesCabecas[this.esquerda]}|${nomesCabecas[this.direita]}]`;
    }
}

export class CasaTabuleiro {
    constructor(peca) {
        this.peca = peca;
        this.proximo = null;
        this.anterior = null;
    }
}