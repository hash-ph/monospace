import { Component, h } from '@stencil/core';

@Component({
    tag: 'mono-editor',
    styleUrl: 'mono-editor.css',
    shadow: true,
})
export class MonoEditor {
    editorEl!: HTMLDivElement;

    componentDidLoad() {}

    render() {
        return <div class="editor-container" ref={el => (this.editorEl = el)}></div>;
    }
}
