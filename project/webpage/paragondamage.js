import {LitElement, html, css,} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { attackComp } from './paragondetails/attackcomp.js';

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

    render() {
        if(this._paragon) {
            this._damageComputation();
        }
        return html`
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
        `;
    }
}

customElements.define("paragon-damage", paragonDamage);