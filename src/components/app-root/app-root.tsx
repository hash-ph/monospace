import { Component, h, Listen, State } from '@stencil/core';
import localforage from 'localforage';

import { newNote, Note } from '../../library/models';

const KEY_FOCUSED_NOTE_ID = 'key::focused_note_id';
const KEY_NOTE_IDS = 'key::note_ids';
// const KEY_ROOT_STATE = 'key::root_state';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
    shadow: true,
})
export class AppRoot {
    @State() noteIds: string[] = [];
    @State() focusedNote: Note = newNote();

    async componentDidLoad() {
        this.noteIds = await localforage.getItem<string[]>(KEY_NOTE_IDS);
        const noteId = await localforage.getItem<Note>(KEY_FOCUSED_NOTE_ID);
        if (!noteId) {
            this.loadNote(newNote());
            return;
        }
        this.loadNoteId(noteId);
    }

    async loadNote(note: Note) {
        this.focusedNote = note;
    }

    async deleteNote(note: Note) {
        await localforage.removeItem(note.id);
    }

    @Listen('newNote')
    async newNote() {
        this.loadNote(newNote());
    }

    @Listen('saveNote')
    async saveNote() {
        await localforage.setItem(KEY_FOCUSED_NOTE_ID, this.focusedNote.id);
        await localforage.setItem(this.focusedNote.id, this.focusedNote);
    }

    @Listen('loadNoteId')
    async loadNoteId(event: string | any) {
        const id = typeof event === 'string' ? event : event.detail;
        this.loadNote(await localforage.getItem(id));
    }

    @Listen('deleteNodeId')
    async deleteNoteId(event: string | any) {
        const id = typeof event === 'string' ? event : event.detail;
        this.deleteNote(await localforage.getItem(id));
    }

    @Listen('contentChanged')
    handleContentChanged(event) {
        this.focusedNote.content = event.detail;
        this.saveNote();
    }

    render() {
        return (
            <div class="root-container">
                <mono-organizer class="sidebar"></mono-organizer>
                <mono-editor class="contents" content={this.focusedNote.content}></mono-editor>
            </div>
        );
    }
}
