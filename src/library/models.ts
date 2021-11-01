import { v4 as uuidv4 } from 'uuid';

export interface Note {
    id: string;
    title?: string;
    tags?: string[];
    content: string;
    created: number;
    updated: number;
}

export function newNote(): Note {
    return {
        id: uuidv4(),
        content: '',
        created: new Date().getTime(),
        updated: new Date().getTime(),
    };
}

export function parse(note: Note): Note {
    return {
        ...note,
        title: note.content.split('\n')[0],
        updated: new Date().getTime(),
    };
}
