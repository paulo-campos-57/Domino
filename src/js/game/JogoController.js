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
        } else if (modo === 'dupla') {
            this._iniciarModoDoisJogadores();
        } else {
            this.logEl.textContent = 'Erro! Modo de jogo inválido. Volte ao menu.';
        }
    }

    _iniciarModoDoisJogadores() {
        this._adicionarLog('Modo dois jogadores iniciado!', 'log-info');
        this._sortearMaosJogadores();
        this._atualizarUI();
        this._habilitarJogadaJogador();
    }

    _sortearMaosJogadores() {
        // Divide as peças entre dois jogadores
        const metade = Math.floor(this.jogo.pecasDisponiveis.length / 2);
        this.maoJogador1 = this.jogo.pecasDisponiveis.splice(0, metade);
        this.maoJogador2 = this.jogo.pecasDisponiveis.splice(0, metade);
        this.jogo.pecasDisponiveis = []; // Não há monte
    }

    _habilitarJogadaJogador() {
        // Renderiza as peças do jogador atual e habilita botões de jogada
        const maoAtual = this.jogo.jogadorAtual === 1 ? this.maoJogador1 : this.maoJogador2;
        this.controlesEl.innerHTML = '';
        maoAtual.forEach((peca, idx) => {
            const btnInicio = document.createElement('button');
            btnInicio.textContent = `Início ${peca.toString()}`;
            btnInicio.onclick = () => this._jogarPeca(idx, 'inicio');
            this.controlesEl.appendChild(btnInicio);

            const btnFim = document.createElement('button');
            btnFim.textContent = `Fim ${peca.toString()}`;
            btnFim.onclick = () => this._jogarPeca(idx, 'fim');
            this.controlesEl.appendChild(btnFim);
        });
    }

    _jogarPeca(indice, estrategia) {
        const maoAtual = this.jogo.jogadorAtual === 1 ? this.maoJogador1 : this.maoJogador2;
        const peca = maoAtual[indice];
        let retorno;
        if (estrategia === 'inicio') {
            retorno = this.jogo.tabuleiro.incluirDoInicio(peca);
        } else {
            retorno = this.jogo.tabuleiro.incluirDoFim(peca);
        }

        if (retorno === -1) {
            this._adicionarLog('Jogada inválida! Tente outra peça ou lado.', 'log-erro');
        } else {
            maoAtual.splice(indice, 1);
            this._adicionarLog(`Jogador ${this.jogo.jogadorAtual} jogou ${peca.toString()} no ${estrategia}.`, 'log-sucesso');
            this.jogo.jogadorAtual = this.jogo.jogadorAtual === 1 ? 2 : 1;
        }

        this._atualizarUI();
        if (this._verificarFimDeJogo()) return;
        this._habilitarJogadaJogador();
    }

    _verificarFimDeJogo() {
        if (this.maoJogador1.length === 0 || this.maoJogador2.length === 0) {
            this._adicionarLog(`FIM DE JOGO! Jogador ${this.maoJogador1.length === 0 ? 1 : 2} venceu!`, 'log-final');
            this.controlesEl.innerHTML = '';
            return true;
        }
        // Checa se ambos estão travados
        if (!this._jogadorPodeJogar(this.maoJogador1) && !this._jogadorPodeJogar(this.maoJogador2)) {
            this._adicionarLog('JOGO TRANCADO! Nenhum jogador pode jogar.', 'log-final');
            this.controlesEl.innerHTML = '';
            return true;
        }
        return false;
    }

    _jogadorPodeJogar(mao) {
        for (const peca of mao) {
            if (
                this.jogo.tabuleiro.incluirDoInicio(peca) !== -1 ||
                this.jogo.tabuleiro.incluirDoFim(peca) !== -1
            ) {
                return true;
            }
        }
        return false;
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
    _criarDominoPiece(valorA, valorB) {
        function gerarPips(valor) {
            const pipsMap = [
                [], // 0
                [4], // 1
                [0, 8], // 2
                [0, 4, 8], // 3
                [0, 2, 6, 8], // 4
                [0, 2, 4, 6, 8], // 5
                [0, 2, 3, 5, 6, 8], // 6
            ];
            const pips = Array(9).fill('');
            pipsMap[valor].forEach(i => pips[i] = '<span class="domino-pip"></span>');
            return `<div class="domino-pips">${pips.join('')}</div>`;
        }
        return `
        <div class="domino-piece">
            <div class="domino-half">${gerarPips(valorA)}</div>
            <div class="divider"></div>
            <div class="domino-half">${gerarPips(valorB)}</div>
        </div>
    `;
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
                pecas.push(this._criarDominoPiece(ponteiro.peca.esquerda, ponteiro.peca.direita));
                ponteiro = ponteiro.proximo;
            }
            this.tabuleiroEl.innerHTML = pecas.join('');
        }
        if (resultadoTurno && resultadoTurno.mensagem) {
        }
    }
}