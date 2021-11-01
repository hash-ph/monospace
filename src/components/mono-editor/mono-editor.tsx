import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import EasyMDE from 'easymde';

@Component({
    tag: 'mono-editor',
    styleUrl: 'mono-editor.scss',
    shadow: true,
})
export class MonoEditor {
    @Prop() content: string;
    @Event() contentChanged: EventEmitter<string>;

    editorContainerEl!: HTMLDivElement;
    editorEl!: HTMLTextAreaElement;
    editor: EasyMDE;

    @Watch('content')
    watchContentHandler(curr: string) {
        this.editor?.value(curr);
    }

    componentDidLoad() {
        this.editor = new EasyMDE({
            element: this.editorEl,
            toolbar: false,
            spellChecker: false,
            maxHeight: `${this.editorContainerEl.clientHeight - 32}px`,
            placeholder: 'Type anything in markdown...',
        });
        this.editor.value(this.content);

        this.editor.codemirror.on('change', () => {
            this.contentChanged.emit(this.editor.value());
        });
    }

    render() {
        return (
            <div class="editor-container" ref={el => (this.editorContainerEl = el)}>
                <textarea ref={el => (this.editorEl = el)}>Hello world</textarea>
            </div>
        );
    }
}
