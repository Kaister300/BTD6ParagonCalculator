import {LitElement, html, css,} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { attackComp } from './paragondetails/attackcomp.js';

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

        h1 {
            margin: 0;
        }

        div {
            padding: 1rem;
        }

        .warning {
            display: block;
            margin-top: 0.5rem;
            color: red;
        }
    `;

    constructor() {
        super();
        window.addEventListener("degree", (e) => this.degree = parseInt(e.detail.currDegree));
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
        this.attacks = [];
    }

    _grabSelected(e) {
        // Resets paragon data
        if(e.target.value === "") {
            this.setDefault();
        }

        // Fetches paragon data
        else {
            let arr = e.target.value.split(";");
            console.log(`${window.location.href}paragondetails/${arr[0]}/${arr[1]}.json`);
            fetch(`${window.location.href}paragondetails/${arr[0]}/${arr[1]}.json`)
            .then(response => response.json())
            .then(data => this._paragon = data.paragon)
            .then(data => console.log(this._paragon));
        }
    }

    _damageComputation() {
        // Sets name of paragon
        this.name = this._paragon.name;

        // Resets Attack Array
        this.attacks = [];

        // Sets damage
        for(const { name, isdot, damage, ceramic, moab, boss, elite, pierce, speed, cooldown} of this._paragon.attacks) {
            this.attacks.push(new attackComp(this.degree, name, isdot, damage, ceramic, moab, boss, elite, pierce, speed, cooldown));
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
                <label for="paragon">Choose Paragon: </label>
                <select id="paragon" @change=${this._grabSelected}>
                    <option value="">Please choose an option</option>
                    <optgroup label="Primary">
                        <option value="primary;dart">Dart Monkey</option>
                        <option value="primary;boomerangm">Boomerang Monkey</option>
                    </optgroup>
                    <optgroup label="Military">
                        <option value="military;buccaneer">Monkey Buccaneer</option>
                        <option value="military;ace">Monkey Ace</option>
                    </optgroup>
                    <optgroup label="Magic">
                        <option value="magic;ninja">Ninja Monkey</option>
                        <option value="magic;wizard">Wizard Monkey</option>
                    </optgroup>
                    <optgroup label="Support">
                        <option value="support;engineer">Engineer Monkey</option>
                    </optgroup>
                </select><br>
                <span class="warning"><strong>NOTE:</strong> The numbers below are most likely inaccurate due to missing/incomplete data from the wiki.</span>
            </div>
            <div>
                <h2>${this.name}</h2>
                <h3>Degree ${this.degree}</h3>
            ${this.attacks.map(attack => {return html`
                <section>
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
            </div>
        </div>
        `;
    }
}

customElements.define("paragon-damage", paragonDamage);