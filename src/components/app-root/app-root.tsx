import { Component, h, State } from '@stencil/core';

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

    render() {
        return (
            <div class="root-container">
                <mono-editor></mono-editor>
            </div>
        );
    }
}
