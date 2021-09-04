import { ITerminalOptions, Terminal } from 'xterm';
import ansi from 'ansi-escape-sequences';

export class MonoTerminal extends Terminal {
    constructor(options?: ITerminalOptions) {
        super(options);
    }

    bufferText(trim = false): string {
        let s = Array.from(new Array(this.rows))
            .map((_, i) => this.buffer.active.getLine(i).translateToString())
            .map(line => (trim ? line.trimEnd() : line))
            .join('\n');

        if (trim) {
            return s.trimEnd();
        }
        return s;
    }

    loadText(s: string) {
        this.write(ansi.erase.display(2));
        s.split('\n').forEach((line, i) => {
            this.write(line);
            if (i < s.length - 1) {
                this.write(ansi.cursor.nextLine());
            }
        });
    }

    get cursorX() {
        return this.buffer.active.cursorX;
    }

    get cursorY() {
        return this.buffer.active.cursorY;
    }

    currentLine(): string {
        return this.buffer.active.getLine(this.cursorY).translateToString();
    }

    cursorToPrevWord() {
        const re = /(\w+\W*)$/g;
        const line = this.currentLine().slice(0, this.cursorX);

        const match = line.match(re);
        if (match && match.length) {
            const shift = match[0].length;
            this.write(ansi.cursor.position(this.cursorY + 1, this.cursorX + 1 - shift));
        }
    }

    cursorToNextWord() {
        const re = /^(\W*\w+)/g;
        const line = this.currentLine().slice(this.cursorX);

        const match = line.match(re);
        if (match && match.length) {
            const shift = match[0].length;
            this.write(ansi.cursor.position(this.cursorY + 1, this.cursorX + 1 + shift));
        }
    }

    cursorToNextEstimatedLine() {
        // TODO
    }
}
