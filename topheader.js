import {LitElement, html, css,} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class topHeader extends LitElement {
    static styles = css`
        :host {
            background-color: #C9F0FF;
            display: block;
            max-width: 50rem;
            padding: 1rem;
            margin: auto;
            border-radius: 1rem 1rem 0 0;
            border-bottom: 2px solid black;
        }

        h1 {
            margin: 0;
        }
    `;

    constructor() {
        super();
    }

    render() {
        return html`
        <header>
            <h1>BTD6 Paragon Calculator</h1>
        </header>
        `;
    }
}

customElements.define('top-header', topHeader);