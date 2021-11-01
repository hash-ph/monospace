import { Component, h } from '@stencil/core';

@Component({
    tag: 'mono-editor',
    styleUrl: 'mono-editor.scss',
    shadow: true,
})
export class MonoEditor {
    render() {
        return <div class="editor-container">Hello world</div>;
    }
}
