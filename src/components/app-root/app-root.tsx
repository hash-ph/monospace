import { Component, h, Listen, State } from '@stencil/core';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
    shadow: true,
})
export class AppRoot {
    @State() text = `\r
    Hint #1: Hit ctrl+shift+p to open the menu\r
    Hint #2: Click anywhere and type!\r
    `;

    @Listen('textUpdated')
    handleEditorTextUpdated(event) {
        this.text = event.detail as string;
    }

    render() {
        return (
            <div class="root-container">
                <mono-editor
                    tag="#helloworld"
                    text={this.text}
                    dimensions={{ cols: 80, rows: 24 }}
                ></mono-editor>
                <popup-menu></popup-menu>
            </div>
        );
    }
}
