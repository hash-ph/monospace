import { Component, h, Listen, State } from '@stencil/core';

import { NotesManager } from '../../library/manager';
import { newNote, Note, parse } from '../../library/models';

const STATE_KEY = 'mono:states:root';

interface RootState {
    focusId?: string;
}

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
    shadow: true,
})
export class AppRoot {
    @State() state: RootState = {};
    @State() notes: Note[] = [];
    @State() focus?: Note = newNote();
    @State() focusText = '';

    private manager = new NotesManager();

    async componentWillLoad() {
        await this.manager.reset();
        this.state = await this.manager.loadState<RootState>(STATE_KEY);
        if (!this.state) {
            this.state = {};
        }
        if (this.state?.focusId) {
            this.focus = await this.manager.get(this.state?.focusId);
        }
        this.notes = await this.manager.list();
    }

    @Listen('noteCreate')
    async handleNoteCreate() {
        this.focus = newNote();
        this.focusText = '';
        this.state.focusId = this.focus?.id;
        await this.manager.saveState<RootState>(STATE_KEY, this.state);

        console.log(this.focusText);
    }

    @Listen('noteLoad')
    async handleNoteLoad(event: any) {
        this.focus = await this.manager.get(event.detail);
        this.focusText = this.focus.content;
        this.state.focusId = this.focus?.id;
        await this.manager.saveState<RootState>(STATE_KEY, this.state);
    }

    @Listen('contentChanged')
    async handleContentChanged(event: any) {
        this.focus.content = event.detail;
        this.focus = parse(this.focus);
        await this.manager.set(this.focus);

        this.notes = await this.manager.list();
    }

    render() {
        return (
            <div class="root-container">
                <mono-organizer class="sidebar" notes={this.notes}></mono-organizer>
                <mono-editor class="contents" content={this.focusText}></mono-editor>
            </div>
        );
    }
}
