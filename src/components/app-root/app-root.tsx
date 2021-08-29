import { Component, h } from '@stencil/core';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.css',
    shadow: true,
})
export class AppRoot {
    render() {
        return <mono-editor></mono-editor>;
    }
}
