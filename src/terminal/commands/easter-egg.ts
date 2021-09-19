import { Terminal } from 'xterm';
import { Command } from './command';

export class EasterEgg implements Command<number> {
    execute(term: Terminal, param: number) {
        term.writeln(`hello hello world: ${param}`);
    }
}
