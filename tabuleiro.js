export default class Tabuleiro {
    constructor() {
        this.casas = [];
    }

    incluirDoInicio(novaPeca) {
        if (this.casas.length === 0) {
            this.casas.push(novaPeca);
            return 0;
        }

        const tamanhoOriginal = this.casas.length;

        const primeiraCasa = this.casas[0];
        if (primeiraCasa.esq === novaPeca.dir) {
            this.casas.unshift(novaPeca);
            return 2;
        }
        if (primeiraCasa.esq === novaPeca.esq) {
            const pecaInvertida = { esq: novaPeca.dir, dir: novaPeca.esq };
            this.casas.unshift(pecaInvertida);
            return 2;
        }

        const ultimaCasa = this.casas[tamanhoOriginal - 1];
        if (ultimaCasa.dir === novaPeca.esq) {
            this.casas.push(novaPeca);
            return 1;
        }
        if (ultimaCasa.dir === novaPeca.dir) {
            const pecaInvertida = { esq: novaPeca.dir, dir: novaPeca.esq };
            this.casas.push(pecaInvertida);
            return 1;
        }

        for (let i = 0; i < tamanhoOriginal - 1; i++) {
            const casaAtual = this.casas[i];
            const casaSeguinte = this.casas[i + 1];

            if (casaAtual.dir === novaPeca.esq && casaSeguinte.esq === novaPeca.dir) {
                this.casas.splice(i + 1, 0, novaPeca);
                return tamanhoOriginal - i - 1;
            }

            if (casaAtual.dir === novaPeca.dir && casaSeguinte.esq === novaPeca.esq) {
                const pecaInvertida = { esq: novaPeca.dir, dir: novaPeca.esq };
                this.casas.splice(i + 1, 0, pecaInvertida);
                return tamanhoOriginal - i - 1;
            }
        }

        return -1;
    }

    imprimir() {
        const boardStr = this.casas.map(p => `[${p.esq}|${p.dir}]`).join(' ');
        console.log('Tabuleiro atual:', boardStr || 'Vazio');
    }
}