import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Note } from '../../library/models';

@Component({
    tag: 'mono-organizer',
    styleUrl: 'mono-organizer.scss',
    shadow: true,
})
export class MonoOrganizer {
    @Prop() notes: Note[] = [];
    @Event() noteCreate: EventEmitter<void>;
    @Event() noteLoad: EventEmitter<string>;

    render() {
        return (
            <div class="organizer-container">
                <div class="section">
                    <div class="mono-h1">## Your notes and stuff</div>
                    <input class="search-input" type="text" placeholder="Type to search..." />
                    <div>
                        {this.notes.map(note => (
                            <button class="button -box" onClick={() => this.noteLoad.emit(note.id)}>
                                {note.title}
                            </button>
                        ))}
                    </div>
                </div>
                <div class="section">
                    <div class="mono-h1">## Create</div>
                    <button class="button" onClick={() => this.noteCreate.emit()}>
                        New note
                    </button>
                </div>
            </div>
        );
    }
}
