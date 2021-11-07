import { Note } from './models';
import localforage from 'localforage';

export enum StorageKeys {
    SET_OF_NOTES = 'mono:SET_OF_NOTES',
    ROOT_STATE = 'mono:ROOT_STATE',
}

export namespace StorageKeys {
    export function of(noteOrNoteId: Note | string): string {
        let noteId: string;
        if (typeof noteOrNoteId === 'string') {
            noteId = noteOrNoteId;
        } else {
            noteId = noteOrNoteId.id;
        }
        return `mono:notes:${noteId}`;
    }
}

export class NotesManager {
    async reset() {
        await localforage.clear();
    }

    async saveState<T>(key: string, state: T) {
        return await localforage.setItem<T>(key, state);
    }

    async loadState<T>(key: string) {
        return await localforage.getItem<T>(key);
    }

    async list(): Promise<Note[]> {
        const noteIds = await localforage.getItem<Set<string>>(StorageKeys.SET_OF_NOTES);
        if (noteIds === null) {
            return [];
        }

        return await Promise.all(
            [...noteIds].map(id => localforage.getItem<Note>(StorageKeys.of(id))),
        );
    }

    async set(note: Note) {
        // Check if already exists, then inherit the created date.
        const prev = await localforage.getItem<Note>(StorageKeys.of(note));
        if (prev !== null) {
            note.created = prev.created;
        }
        await localforage.setItem(StorageKeys.of(note), note);

        // Register to the list of notes.
        let ids = await localforage.getItem<Set<string>>(StorageKeys.SET_OF_NOTES);
        if (ids === null) {
            ids = new Set<string>();
        }
        ids.add(note.id);
        await localforage.setItem<Set<string>>(StorageKeys.SET_OF_NOTES, ids);

        console.log('add', note, ids);
    }

    async get(noteId: string): Promise<Note | null> {
        return await localforage.getItem<Note>(StorageKeys.of(noteId));
    }
}
