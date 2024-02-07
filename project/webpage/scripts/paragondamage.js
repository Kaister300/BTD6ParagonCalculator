import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { attackComp } from './attackcomp.js';

class paragonDamage extends LitElement {
    static properties = {
        degree: {type: Number},
        _paragon: {state: true},
        hidden: {type: Boolean},
    };

    static styles = css`
        :host {
            background-color: #EAFFFD;
            display: block;
            max-width: 52rem;
            margin: auto;
            border-radius: 1rem;
            margin-top: 0.8rem;
        }

        header {
            background-color: #C9F0FF;
            display: flex;
            padding: 1rem;
            border-radius: 1rem;
        }
        header > h1 {
            display: inline;
            font-size: 2rem;
        }
        header > button {
            margin-left: auto;
            cursor: pointer;
        }

        h1, h2, h3 {
            margin: 0;
        }
        h3 {
            font-weight: 400;
            font-style: italic;
        }

        div {
            padding: 1rem;
        }
        div > div {
            padding: 1rem 0;
        }

        .warning {
            display: block;
            margin-top: 0.5rem;
            color: red;
        }

        section {
            padding: 5px;
            margin: 0.5rem 0;
        }
        section h4 {
            margin: 0.5rem 0;
            font-size: larger;
        }
        section p {
            margin: 0.5rem 0;
        }

        section.normal {
            background-color: rgba(128, 0, 128, 0.6);
            border-bottom: purple solid;
        }
    `;

    constructor() {
        super();

        // Takes in paragon data from paragon selector
        window.addEventListener("paragon_data",(e) => {
            if (e.detail.paragon) {
                this._paragon = e.detail.paragon;
            }
            else {
                this.setDefault()
            }
        });

        // Takes degree from calculator
        window.addEventListener("degree", (e) => this.degree = parseInt(e.detail.currDegree));

        // Initialise All Variables
        this.degree = 1;
        this.hidden = true;
        this.setDefault();
    }

    setDefault() {
        // Resets paragon json data
        this._paragon = void 1;

        // Resets Paragon Name
        this.name = "--------"

        // Resets attacks of paragon
        this.fullattacks = [];
    }

    _damageComputation() {
        // Sets name of paragon
        this.name = this._paragon.name;

        // Resets Attack Array
        this.fullattacks = [];

        // Sets damage
        for(const x of this._paragon.fullattacks) {
            let entry = {};
            entry.name = x.name;
            entry.attacks = [];

            for(const { name, type="normal", isdot, damage, ceramic, moab, boss, elite, pierce, speed, cooldown} of x.attacks) {
                entry.attacks.push(new attackComp(this.degree, name, type, isdot, damage, ceramic, moab, boss, elite, pierce, speed, cooldown));
            }

            this.fullattacks.push(entry)
        }
    }

    hideWidget(e) {
        // Finds Button, Header and Div
        let button = e.target;
        let damageHeader = e.target.parentElement;
        let damageElement = e.target.parentElement.nextElementSibling;
        
        // Opens/Closes Main Content
        if(this.hidden) {
            button.textContent = "Close";
            damageElement.hidden = false;
            damageHeader.style["border-radius"] = "1rem 1rem 0 0";
            damageHeader.style["border-bottom"] = "2px solid black"
        }
        else {
            button.textContent = "Open";
            damageElement.hidden = true;
            damageHeader.style["border-radius"] = "1rem";
            damageHeader.style["border-bottom"] = "none";
        }
        this.hidden = !this.hidden;
    }

    render() {
        if(this._paragon) {
            this._damageComputation();
        }
        return html`
        <header>
            <h1>Paragon Damage Calculator (WIP)</h1>
            <button @click=${this.hideWidget}>Open</button>
        </header>
        <div hidden>
            <div>
                <span class="warning"><strong>NOTE:</strong> The numbers below are most likely inaccurate due to missing/incomplete data from the wiki.</span>
            </div>
            <div>
                <h2>${this.name}</h2>
                <h3>Degree ${this.degree}</h3>
                <div id="fullattacks">
            ${this.fullattacks.map(fullatk => {return html`
                    <div>
                    <h3>${fullatk.name}</h3>
                    ${fullatk.attacks.map(attack => {return html`
                        <section class="${attack.type}">
                            <h4>${attack.name}</h4>
                            <p>Damage over Time: ${attack.isdot}</p>
                            <p>Base Damage: ${attack.damage}</p>
                            <p>Ceramic Damage: ${attack.ceramic}</p>
                            <p>MOAB Damage: ${attack.moab}</p>
                            <p>Boss Bloon Damage: ${attack.boss}</p>
                            <p>Elite Boss Bloon Damage: ${attack.elite}</p>
                            <p>Pierce: ${attack.pierce}</p>
                            ${!attack.isdot
                                ? html`<p>Attack Speed: ${attack.speed}</p>`
                                : html`<p>Time Lasting: ${attack.speed}s</p>`
                            }
                        </section>`
                    })}

                    </div>`
            })}
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define("paragon-damage", paragonDamage);