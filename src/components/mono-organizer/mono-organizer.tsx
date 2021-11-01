import { Component, h } from '@stencil/core';

@Component({
    tag: 'mono-organizer',
    styleUrl: 'mono-organizer.scss',
    shadow: true,
})
export class MonoOrganizer {
    render() {
        return (
            <div class="organizer-container">
                <div class="section">
                    <div class="mono-h1">## Your notes and stuff</div>
                    <input class="search-input" type="text" placeholder="Type to search..." />
                    <div>
                        <button class="button -box">My note 1</button>
                        <button class="button -box">My note 2</button>
                        <button class="button -box">My note 3</button>
                        <button class="button -box">My note 4</button>
                    </div>
                </div>
                <div class="section">
                    <div class="mono-h1">## Create</div>
                    <button class="button">New note</button>
                </div>
            </div>
        );
    }
}
