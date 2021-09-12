import { Component, h, Listen, State } from '@stencil/core';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.css',
    shadow: true,
})
export class AppRoot {
    @State() text = 'hello world';

    @Listen('textUpdated')
    handleEditorTextUpdated(event) {
        this.text = event.detail as string;
    }

    render() {
        return (
            <div>
                <mono-editor text={this.text} dimensions={{ cols: 80, rows: 32 }}></mono-editor>
            </div>
        );
    }
}
