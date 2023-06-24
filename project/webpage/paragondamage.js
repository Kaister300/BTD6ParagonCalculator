import {LitElement, html, css,} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class paragonDamage extends LitElement {
    static properties = {
        degree: {type: Number},
        _paragon: {state: true},
    };

    static styles = css`
        :host {
            background-color: #EAFFFD;
            display: block;
            max-width: 50rem;
            padding: 1rem;
            margin: auto;
            border-radius: 1rem;
        }

        header {
            border-bottom: 2px solid black;
        }

        h1 {
            margin: 0;
        }
    `;

    constructor() {
        super();
        this.degree = 0;
        window.addEventListener("degree", (e) => this.degree = e.detail.currDegree);
    }

    render() {
        return html`
        <div>
            <label for="paragon">Choose Paragon: </label>
            <select>
                <option value="nothing">Please choose an option</option>
                <option value="dart">Dart Monkey</option>
                <option value="boomerang">Boomerang Monkey</option>
                <option value="ninja">Ninja Monkey</option>
            </select>
        </div>
        `;
    }
}

customElements.define("paragon-damage", paragonDamage);