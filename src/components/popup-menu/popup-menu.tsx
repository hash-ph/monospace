import { Component, h, Listen, State } from '@stencil/core';
import { Command } from '../../terminal/commands/command';
import { EasterEgg } from '../../terminal/commands/easter-egg';

@Component({
    tag: 'popup-menu',
    styleUrl: 'popup-menu.scss',
    shadow: true,
})
export class PopupMenu {
    input!: HTMLInputElement;
    container!: HTMLDivElement;
    commands: Array<{name: string, command: Command<any>}> = [
        {name: 'Execute easter egg', command: new EasterEgg()},
    ];

    @State() enabled = false;

    componentDidLoad() {
        this.input.focus();
    }

    @Listen('keydown', { target: 'window' })
    handleKeyDown(ev: KeyboardEvent) {
        if (ev.ctrlKey && ev.shiftKey && ev.code === 'KeyP') {
            this.enabled = true;
            setTimeout(() => this.input.focus());
            ev.preventDefault();
            return;
        }
        if (ev.code === 'Escape') {
            this.enabled = false;
            this.input.blur();
            ev.preventDefault();
            return;
        }
    }

    private onInputFocus(_event: Event) {
        this.input.value = '';
    }

    private onInputBlur(_event: Event) {
        this.input.value = '';
    }

    render() {
        return (
            <div
                class={{
                    'menu-container': true,
                    '-hidden': !this.enabled,
                }}
            >
                <div class="menu-dropdown">
                    <input
                        type="text"
                        class="menu-input"
                        ref={el => (this.input = el)}
                        onFocus={e => this.onInputFocus(e)}
                        onBlur={e => this.onInputBlur(e)}
                    />
                </div>
            </div>
        );
    }
}
