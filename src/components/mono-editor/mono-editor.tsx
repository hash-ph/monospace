import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import ansi from 'ansi-escape-sequences';
import { ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { MonoTerminal } from './mono-terminal';

@Component({
    tag: 'mono-editor',
    styleUrl: 'mono-editor.scss',
    shadow: true,
})
export class MonoEditor {
    @Prop() dimensions = { cols: 80, rows: 24 };
    @Prop() tag = '#untitled';
    @Prop() text = '';

    @Event({ eventName: 'textUpdated', bubbles: true, composed: true })
    textUpdated: EventEmitter<string>;

    private term: MonoTerminal;
    private termFitAddon: FitAddon;

    private editorEl!: HTMLElement;
    private measure = { w: 0, h: 0 };

    componentDidLoad() {
        const options: ITerminalOptions = {
            theme: {
                background: '#fafafa',
                foreground: '#3a3a3a',
                cursor: '#ffd866',
                selection: '#ffd866',
            },
        };
        this.term = new MonoTerminal(options);
        if (!this.dimensions) {
            this.termFitAddon = new FitAddon();
            this.term.loadAddon(this.termFitAddon);
        }
        this.term.open(this.editorEl);

        // For copy paste stuff.
        this.term.onData(this.term.write.bind(this.term));
        // For manually inputted stuff.
        this.term.attachCustomKeyEventHandler(this.terminalKeyHandler.bind(this));

        this.updateTextHandler(this.text);
        this.updateDimensionsHandler(this.dimensions);

        this.onTerminalResize();
    }

    disconnectedCallback() {
        this.term.dispose();
    }

    @Watch('text')
    updateTextHandler(curr: string) {
        this.term.clear();
        this.term.write(curr);
    }

    @Watch('dimensions')
    updateDimensionsHandler(curr?: { cols: number; rows: number }) {
        this.term.resize(curr.cols, curr.rows);
    }

    onTerminalResize() {
        const measureEl = this.term.element.querySelector('.xterm-char-measure-element');
        this.measure.w = measureEl.clientWidth;
        this.measure.h = measureEl.clientHeight;

        // If dimensions is unspecified, use autofit.
        if (!this.dimensions) {
            this.termFitAddon.fit();
            return;
        }

        // Fit container to size of terminal.
        const screen = this.editorEl.querySelector('.xterm-screen') as HTMLElement;
        this.editorEl.style.height = screen.style.height;
        this.editorEl.style.width = screen.style.width;
    }

    terminalKeyHandler(event: KeyboardEvent): boolean {
        if (event.type === 'keydown' && event.ctrlKey && event.shiftKey && event.code === 'KeyC') {
            this.term.clear();
            return false;
        }
        if (event.type === 'keydown' && event.code === 'Backspace') {
            this.term.write(ansi.cursor.back() + ' ' + ansi.cursor.back());
            return false;
        }
        if (event.type === 'keydown' && !event.ctrlKey && event.code === 'Enter') {
            event.preventDefault();
            this.term.cursorToNextEstimatedLine();
            return false;
        }
        if (event.type === 'keydown' && event.ctrlKey && event.code === 'Enter') {
            event.preventDefault();
            this.term.cursorToNextLine();
            return false;
        }
        if (event.type === 'keydown' && event.ctrlKey && event.code === 'KeyA') {
            event.preventDefault();
            this.term.selectAll();
            return false;
        }
        if (event.type === 'keydown' && event.ctrlKey && event.code === 'ArrowLeft') {
            event.preventDefault();
            this.term.cursorToPrevWord();
            return false;
        }
        if (event.type === 'keydown' && event.ctrlKey && event.code === 'ArrowRight') {
            event.preventDefault();
            this.term.cursorToNextWord();
            return false;
        }
    }

    onMouseDown(event: MouseEvent) {
        // Ignore any clicks other than left mouse clicks.
        if (event.button !== 0) {
            return;
        }

        const x = (event as any).layerX;
        const y = (event as any).layerY;
        const col = Math.floor(x / this.measure.w);
        const row = Math.floor(y / this.measure.h);

        // ANSI cursor position is 1-indexed.
        this.term.write(ansi.cursor.position(row + 1, col + 1));
    }

    render() {
        return (
            <div class="editor-container">
                <div class="title">{this.tag}</div>
                <div
                    class="editor"
                    onMouseDown={e => this.onMouseDown(e)}
                    ref={el => (this.editorEl = el as HTMLElement)}
                ></div>
            </div>
        );
    }
}
