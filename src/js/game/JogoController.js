import BurrinhoInteligente from './BurrinhoInteligente.js';

export default class JogoController {
    constructor() {
        this.jogo = new BurrinhoInteligente();
        this._mapearElementosDOM();
    }

    _mapearElementosDOM() {
        this.telaJogoEl = document.querySelector('#tela-jogo');
        this.jogadorAtualEl = document.querySelector('#jogador-atual');
        this.pecasRestantesEl = document.querySelector('#pecas-restantes');
        this.tabuleiroEl = document.querySelector('#tabuleiro');
        this.logEl = document.querySelector('#log-mensagens');
        this.controlesEl = document.querySelector('#controles-jogador');
        this.btnJogarInicio = document.querySelector('#btn-jogar-inicio');
        this.btnJogarFim = document.querySelector('#btn-jogar-fim');
    }

    iniciarJogo(modo) {
        if (modo === 'simulacao') {
            this._iniciarModoSimulacao();
        } else if (modo === 'jogador') {
            this._iniciarModoJogador();
        } else {
            this.logEl.textContent = 'Erro! Modo de jogo inválido. Volte ao menu.';
        }
    }

    _iniciarModoSimulacao() {
        this._adicionarLog('Iniciando modo simulação...', 'log-info');
        const intervaloSimulacao = setInterval(() => {
            if (this.jogo.pecasDisponiveis.length === 0) {
                this._adicionarLog('FIM DE JOGO! Todas as peças foram usadas.', 'log-final');
                clearInterval(intervaloSimulacao);
                return;
            }
            const resultadoTurno = this.jogo.jogarTurno(Math.random() < 0.5 ? 'inicio' : 'fim');
            this._atualizarUI(resultadoTurno);
            if (this.jogo.checarJogoTrancado(resultadoTurno)) {
                this._adicionarLog(`JOGO TRANCADO! Nenhuma das ${this.jogo.pecasDisponiveis.length} peças restantes serve.`, 'log-final');
                clearInterval(intervaloSimulacao);
            }
        }, 500);
    }

    _adicionarLog(mensagem, classe = '') {
        if (this.logEl) {
            const div = document.createElement('div');
            div.textContent = mensagem;
            if (classe) div.classList.add(classe);
            this.logEl.appendChild(div);
        }
    }

    _atualizarUI(resultadoTurno) {
        if (this.jogadorAtualEl) {
            this.jogadorAtualEl.textContent = `Jogador atual: ${this.jogo.jogadorAtual}`;
        }
        if (this.pecasRestantesEl) {
            this.pecasRestantesEl.textContent = `Peças restantes: ${this.jogo.pecasDisponiveis.length}`;
        }
        if (this.tabuleiroEl && this.jogo.tabuleiro) {
            let pecas = [];
            let ponteiro = this.jogo.tabuleiro.inicio;
            while (ponteiro) {
                pecas.push(ponteiro.peca.toString());
                ponteiro = ponteiro.proximo;
            }
            this.tabuleiroEl.textContent = pecas.join(' ');
        }
        if (resultadoTurno && resultadoTurno.mensagem) {
            this._adicionarLog(resultadoTurno.mensagem, resultadoTurno.sucesso ? 'log-sucesso' : 'log-erro');
        }
    }
}