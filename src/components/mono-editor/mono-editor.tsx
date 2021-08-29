import { Component, h, State } from '@stencil/core';

function fontDimensions(el: HTMLElement, resolution = 10) {
    const tmpEl = el.cloneNode() as HTMLElement;
    tmpEl.style.position = 'absolute';
    tmpEl.innerText = Array.from(Array(resolution))
        .fill(Array.from(Array(resolution)).fill('X').join(''))
        .join('\n');
    document.body.appendChild(tmpEl);

    const w = tmpEl.clientWidth;
    const h = tmpEl.clientHeight;

    document.body.removeChild(tmpEl);

    return {
        width: w / resolution,
        height: h / resolution,
    };
}

@Component({
    tag: 'mono-editor',
    styleUrl: 'mono-editor.scss',
    shadow: true,
})
export class MonoEditor {
    tileDimensions = fontDimensions(document.createElement('div'));
    editorEl!: HTMLElement;
    cursorEl!: HTMLElement;

    @State() col: number = 0;
    @State() row: number = 0;

    private recalculateCursor(event: MouseEvent) {
        const cx = (event as any).layerX + this.editorEl.scrollLeft;
        const cy = (event as any).layerY + this.editorEl.scrollTop;

        this.col = Math.floor(cx / this.tileDimensions.width);
        this.row = Math.floor(cy / this.tileDimensions.height);

        this.cursorEl.style.width = `${this.tileDimensions.width}px`;
        this.cursorEl.style.height = `${this.tileDimensions.height}px`;
        this.cursorEl.style.left = `${
            this.editorEl.clientLeft +
            this.col * this.tileDimensions.width -
            this.editorEl.scrollLeft
        }px`;
        this.cursorEl.style.top = `${
            this.editorEl.clientTop +
            this.row * this.tileDimensions.height -
            this.editorEl.scrollTop
        }px`;
    }

    onMouseMove(event: MouseEvent) {
        this.recalculateCursor(event);
    }

    onMouseDown(event: MouseEvent) {
        this.recalculateCursor(event);

        let lines = this.editorEl.innerText.split('\n');

        if (lines.length < this.row) {
            const newLines = this.row - lines.length + 1;
            lines = lines.concat(...Array.from(Array(newLines).fill('')));
        }

        let line = lines[this.row];
        if (line.length < this.col) {
            const newSpaces = this.col - line.length;
            const spaces = Array.from(Array(newSpaces)).fill(' ').join('');
            lines[this.row] = line + spaces;
        }

        this.editorEl.innerText = lines.join('\n');
    }

    render() {
        return (
            <div class="editor-container">
                <div
                    class="editor"
                    onMouseMove={event => this.onMouseMove(event)}
                    onMouseDown={event => this.onMouseDown(event)}
                    contentEditable={true}
                    ref={el => (this.editorEl = el as HTMLElement)}
                ></div>
                <div class="ghost-cursor" ref={el => (this.cursorEl = el as HTMLElement)}></div>

                <div>
                    Line {this.row}, Col {this.col}
                </div>
            </div>
        );
    }
}
