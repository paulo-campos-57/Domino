import { CabecaPeca, Peca } from './model.js';
import Tabuleiro from './Tabuleiro.js';

export default class BurrinhoInteligente {

    constructor() {
        this.tabuleiro = new Tabuleiro();
        this.pecasDisponiveis = this._gerarPecasDominos();
        this.jogadorAtual = 1;
        this.historico = [];
        console.log("Jogo 'Burrinho Inteligente' iniciado com 28 peças.");
    }

    _gerarPecasDominos() {
        const pecas = [];
        for (let i = CabecaPeca.BRANCO; i <= CabecaPeca.SENA; i++) {
            for (let j = i; j <= CabecaPeca.SENA; j++) {
                pecas.push(new Peca(i, j));
            }
        }
        pecas.sort(() => Math.random() - 0.5);
        return pecas;
    }

    jogarTurno(estrategia) {
        if (this.pecasDisponiveis.length === 0) {
            const fimDeJogo = "Fim de jogo! O conjunto de peças está vazio.";
            console.log(fimDeJogo);
            return { sucesso: false, mensagem: fimDeJogo };
        }

        const indiceSorteado = Math.floor(Math.random() * this.pecasDisponiveis.length);
        const pecaComprada = this.pecasDisponiveis.splice(indiceSorteado, 1)[0];

        let retorno;
        if (estrategia === 'inicio') {
            retorno = this.tabuleiro.incluirDoInicio(pecaComprada);
        } else {
            retorno = this.tabuleiro.incluirDoFim(pecaComprada);
        }

        const log = {
            jogador: this.jogadorAtual,
            peca: pecaComprada.toString(),
            estrategia: estrategia,
            sucesso: false,
        };

        if (retorno === -1) {
            log.mensagem = `não conseguiu encaixar. A peça voltou para o monte.`;
            this.pecasDisponiveis.push(pecaComprada);
        } else {
            log.sucesso = true;
            log.mensagem = `encaixou a peça com sucesso!`;
        }

        console.log(`Jogador ${log.jogador} tentou pela '${log.estrategia}' com a peça ${log.peca} e ${log.mensagem}`);
        this.historico.push(log);
        this.tabuleiro.imprimir();

        this.jogadorAtual = this.jogadorAtual === 1 ? 2 : 1;

        return log;
    }

    iniciarSimulacao() {
        console.log("\n--- INICIANDO SIMULAÇÃO AUTOMÁTICA ---");

        let tentativasFalhasConsecutivas = 0;

        while (this.pecasDisponiveis.length > 0) {
            const estrategiaAleatoria = Math.random() < 0.5 ? 'inicio' : 'fim';

            const resultadoTurno = this.jogarTurno(estrategiaAleatoria);

            if (resultadoTurno.sucesso) {
                tentativasFalhasConsecutivas = 0;
            } else {
                tentativasFalhasConsecutivas++;
            }

            if (tentativasFalhasConsecutivas >= this.pecasDisponiveis.length) {
                console.log("\n--- JOGO TRANCADO ---");
                console.log(`Nenhuma das ${this.pecasDisponiveis.length} peças restantes pode ser encaixada. O jogo terminou.`);
                break;
            }
        }

        if (this.pecasDisponiveis.length === 0) {
            console.log("\n--- FIM DE JOGO ---");
            console.log("Todas as peças foram utilizadas!");
        }

        console.log("\n--- SIMULAÇÃO FINALIZADA ---");
        console.log("Tabuleiro final:");
        this.tabuleiro.imprimir();
    }
}