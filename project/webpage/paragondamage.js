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
        window.addEventListener("degree", (e) => this.degree = parseInt(e.detail.currDegree));
        this.degree = 1;
        this.setDefault();
    }

    setDefault() {
        this._paragon = void 1;
        this.name = "--------"
        this.damage = "N/A";
        this.ceramic = "N/A";
        this.moab = "N/A";
        this.boss = "N/A";
        this.elite = "N/A";
        this.pierce = "N/A";
        this.speed = "N/A";
        this.cooldown = "N/A";
    }

    _grabSelected(e) {
        if(e.target.value === "") {
            this.setDefault();
        }
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
        this.name = this._paragon.name;
        let gamma = 1+0.01*(this.degree-1);
        this._baseDamage(gamma);
        this.ceramic = this.damage + this._specialDamage(this._paragon.ceramic, gamma);
        this.moab = this.damage + this._specialDamage(this._paragon.moab, gamma);
        this._bossDamage(gamma);
        this._eliteDamage(gamma);
        this._pierceDamage(gamma);
        this._attackSpeed();
    }

    _baseDamage(gamma) {
        if(this.degree === 1) {
            this.damage = this._paragon.damage;
        }
        else if(this.degree === 100) {
            this.damage = 2*this._paragon.damage + 10;
        }
        else {
            this.damage = this._paragon.damage*gamma + (this.degree/10) - 1;
        }
    }

    /*
        This includes Ceramics, MOABs and Fortified bonus damage.
        returns: bonus damage that is applied ontop of base damage
    */
    _specialDamage(special, gamma) {
        if(this.degree === 1) {
            return special;
        }
        else if(this.degree === 100) {
            return 2*special;
        }
        else {
            return special*gamma;
        }
    }

    // Calculates Boss Bloon Damage. Returns nothing
    _bossDamage(gamma) {
        if(this.degree === 1) {
            this.boss = this.damage + this.moab + this._paragon.boss;
        }
        else {
            let extra = this._paragon.boss*gamma;
            //let x = this.damage + this.moab + 2*extra;
            //let y = 1+0.2*(this.degree/20);
            //this.boss = x*y - extra;
            this.boss = (this.damage + this.moab + 2*extra)*(1+0.2*(this.degree/20)) - extra;
        }
    }

    _eliteDamage() {
        this.elite = 2*this.boss;
    }

    _pierceDamage(gamma) {
        if(this.degree === 1) {
            this.pierce = this._paragon.pierce;
        }
        else if(this.degree === 100) {
            this.pierce = 2*this._paragon.pierce + 100
        }
        else {
            this.pierce = this._paragon.pierce*gamma + (this.degree-1);
        }
    }

    _attackSpeed() {
        if(this.degree === 1) {
            this.speed = this._paragon.speed;
        }
        else {
            this.speed = this._paragon.speed / (1+0.01*Math.sqrt(50*this.degree - 50));
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
            </select>
        </div>
        <div>
            <h2>${this.name}</h2>
            <h3>Degree ${this.degree}</h3>
            <p>Base Damage: ${this.damage}</p>
            <p>Ceramic Damage: ${this.ceramic}</p>
            <p>MOAB Damage: ${this.moab}</p>
            <p>Boss Bloon Damage: ${this.boss}</p>
            <p>Elite Boss Bloon Damage: ${this.elite}</p>
            <p>Pierce: ${this.pierce}</p>
            <p>Attack Speed: ${this.speed}</p>
        </div>
        `;
    }
}

customElements.define("paragon-damage", paragonDamage);