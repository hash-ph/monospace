import { Terminal } from 'xterm';

export interface Command<T> {
    execute(term: Terminal, param: T);
}
