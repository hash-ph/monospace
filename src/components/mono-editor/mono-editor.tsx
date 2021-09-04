import { Component, h } from '@stencil/core';
import ansi from 'ansi-escape-sequences';
import { FitAddon } from 'xterm-addon-fit';
import { MonoTerminal } from './mono-terminal';

@Component({
    tag: 'mono-editor',
    styleUrl: 'mono-editor.scss',
    shadow: true,
})
export class MonoEditor {
    term: MonoTerminal;
    termFitAddon: FitAddon;

    editorEl!: HTMLElement;
    measure = { w: 0, h: 0 };

    componentDidLoad() {
        this.term = new MonoTerminal({
            theme: {
                background: '#fafafa',
                foreground: '#3a3a3a',
                cursor: '#ffd866',
                selection: '#ffd866',
            },
        });
        this.termFitAddon = new FitAddon();
        this.term.loadAddon(this.termFitAddon);
        this.term.open(this.editorEl);

        this.term.onData(this.term.write.bind(this.term));
        this.term.attachCustomKeyEventHandler(this.terminalKeyHandler.bind(this));

        this.term.write('click anywhere and type!');

        this.onTerminalResize();
    }

    disconnectedCallback() {
        this.term.dispose();
    }

    onTerminalResize() {
        const measureEl = this.term.element.querySelector('.xterm-char-measure-element');
        this.measure.w = measureEl.clientWidth;
        this.measure.h = measureEl.clientHeight;
        this.termFitAddon.fit();
    }

    terminalKeyHandler(event: KeyboardEvent): boolean {
        if (event.type === 'keydown' && event.code === 'Backspace') {
            this.term.write(ansi.cursor.back() + ' ' + ansi.cursor.back());
            return false;
        }
        if (event.type === 'keydown' && event.code === 'Enter') {
            this.term.write(ansi.cursor.nextLine());
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
        if (event.type === 'keydown' && event.altKey && event.code === 'Enter') {
            // TODO
            return false;
        }
        if (event.ctrlKey && event.code === '') return true;
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
                <div
                    class="editor"
                    contentEditable={true}
                    onMouseDown={e => this.onMouseDown(e)}
                    ref={el => (this.editorEl = el as HTMLElement)}
                ></div>
            </div>
        );
    }
}
