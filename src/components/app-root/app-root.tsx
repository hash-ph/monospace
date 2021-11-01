import { Component, h, Listen, State } from '@stencil/core';
import localforage from 'localforage';

import { Note } from '../../library/models';

const DEFAULT_DRAFT = 'uuid_DRAFT';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
    shadow: true,
})
export class AppRoot {
    @State() notes: Note[] = [];
    @State() content = ``;

    componentWillLoad() {
        localforage.getItem(DEFAULT_DRAFT, (err, value: string) => {
            if (err) {
                console.warn(`loading ${DEFAULT_DRAFT} value from localforage: ${err}`);
                return;
            }
            this.content = value;
        });
    }

    @Listen('contentChanged')
    handleContentChanged(event) {
        localforage.setItem(DEFAULT_DRAFT, event.detail);
    }

    render() {
        return (
            <div class="root-container">
                <mono-organizer class="sidebar"></mono-organizer>
                <mono-editor class="contents" content={this.content}></mono-editor>
            </div>
        );
    }
}
