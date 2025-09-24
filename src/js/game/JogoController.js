import BurrinhoInteligente from './BurrinhoInteligente.js';

export default class JogoController {
    constructor() {
        this.jogo = new BurrinhoInteligente();
        this._mapearElementos();
    }

    _mapearElementos() {
        this.menuEl = document.getElementById('menu-inicial');
        this.telaJogoEl = document.getElementById('tela-jogo');

        this.btnModoJogador = document.getElementById('btn-modo-jogador');
        this.btnModoSimulacao = document.getElementById('btn-modo-simulacao');

        this.infoPanelEl = document.getElementById('info-panel');
        this.tabuleiroEl = document.getElementById('tabuleiro');
        this.logEl = document.getElementById('log-mensagens');
        this.controlesEl = document.getElementById('controles-jogador');
        this.btnJogarInicio = document.getElementById('btn-jogar-inicio');
        this.btnJogarFim = document.getElementById('btn-jogar-fim');
    }

    iniciar() {
        this.btnModoJogador.onclick = () => this._iniciarModoJogador();
        this.btnModoSimulacao.onclick = () => this._iniciarModoSimulacao();
    }

    _transicaoParaJogo() {
        this.menuEl.style.display = 'none';
        this.telaJogoEl.style.display = 'block';
    }

    _iniciarModoSimulacao() {
        this._transicaoParaJogo();
        this.logEl.textContent = 'Iniciando modo simulação...\n';

        const intervalo = setInterval(() => {
            if (this.jogo.pecasDisponiveis.length === 0) {
                this._adicionarLog('FIM DE JOGO! Todas as peças foram usadas.');
                clearInterval(intervalo);
                return;
            }

            const resultado = this.jogo.jogarTurno(Math.random() < 0.5 ? 'inicio' : 'fim');
            this._atualizarTextoUI(resultado);

            if (this.jogo.checarJogoTrancado(resultado)) {
                this._adicionarLog(`JOGO TRANCADO! Nenhuma das ${this.jogo.pecasDisponiveis.length} peças restantes serve.`);
                clearInterval(intervalo);
            }
        }, 300);
    }

    _iniciarModoJogador() {
        this._transicaoParaJogo();
        this._adicionarLog('Modo jogador iniciado.');

        this.btnJogarInicio.onclick = () => this._executarTurnoJogador('inicio');
        this.btnJogarFim.onclick = () => this._executarTurnoJogador('fim');

        this._prepararProximoTurno();
    }

    _prepararProximoTurno() {
        this._atualizarTextoUI();
        this.controlesEl.style.display = 'block';
    }

    _executarTurnoJogador(estrategia) {
        this.controlesEl.style.display = 'none';

        const resultado = this.jogo.jogarTurno(estrategia);
        this._atualizarTextoUI(resultado);

        if (this.jogo.pecasDisponiveis.length === 0) {
            this._adicionarLog('FIM DE JOGO! Todas as peças foram usadas.');
            return;
        }

        if (this.jogo.checarJogoTrancado(resultado)) {
            this._adicionarLog(`JOGO TRANCADO! Nenhuma das ${this.jogo.pecasDisponiveis.length} peças restantes serve.`);
            return;
        }

        this._prepararProximoTurno();
    }

    _atualizarTextoUI(resultadoTurno = null) {
        this.infoPanelEl.textContent = `Vez do Jogador: ${this.jogo.jogadorAtual} | Peças no Monte: ${this.jogo.pecasDisponiveis.length}`;

        let tabuleiroString = "[ Vazio ]";
        if (this.jogo.tabuleiro.tamanho > 0) {
            tabuleiroString = "";
            let ponteiro = this.jogo.tabuleiro.inicio;
            while (ponteiro !== null) {
                tabuleiroString += ponteiro.peca.toString() + " ";
                ponteiro = ponteiro.proximo;
            }
        }
        this.tabuleiroEl.textContent = tabuleiroString;

        if (resultadoTurno) {
            const mensagem = `J${resultadoTurno.jogador} tentou pela '${resultadoTurno.estrategia}' com ${resultadoTurno.peca} e ${resultadoTurno.mensagem}`;
            this._adicionarLog(mensagem);
        }
    }

    _adicionarLog(mensagem) {
        this.logEl.textContent += mensagem + '\n';
        const logs = this.logEl.textContent.split('\n');
        if (logs.length > 10) {
            this.logEl.textContent = logs.slice(logs.length - 10).join('\n');
        }
    }
}