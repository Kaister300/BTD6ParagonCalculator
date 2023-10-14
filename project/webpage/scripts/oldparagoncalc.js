import {LitElement, html, css,} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class oldparagonCalc extends LitElement {
    static properties = {
        currDegree: {type: Number},
        nextDegree: {type: Number},
        sentDegree: {type: Number},
        paragonLevels: {type: Array},
        power: {state: true},
    };

    static styles = css`
        :host {
            background-color: #EAFFFD;
            display: block;
            max-width: 52rem;
            margin: auto;
            margin-top: 0.8rem;
            border-radius: 1rem 1rem;
        }

        header {
            background-color: #C9F0FF;
            display: flex;
            padding: 1rem;
            border-radius: 1rem;
        }
        header > h1 {
            display: inline;
            margin: 0;
            font-size: 2rem;
        }
        header > button {
            margin-left: auto;
            cursor: pointer;
        }

        div {
            padding: 1rem;
        }

        #calc {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin: 5px 0;
        }

        #calc label {
            text-align: right;
            margin: 4px;
        }
        #calc input {
            max-width: 15rem;
            margin: 4px;
        }

        /*
            Tooltip CSS from W3Schools
            - Slightly modified to fit page
        */
        .tooltip {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted black;
          }
          
          /* Tooltip text */
          .tooltip .tooltiptext {
            visibility: hidden;
            width: 140px;
            background-color: #555;
            color: #fff;
            text-align: center;
            padding: 5px;
            border-radius: 6px;
          
            /* Position the tooltip text */
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -60px;
          
            /* Fade in tooltip */
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          /* Tooltip arrow */
          .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
          }
          
          /* Makes tooltip visible on mouse hover */
          .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
          }
        /*
          End of Tooltip Snippet
        */
    `;

    constructor() {
        super();

        // Sets up drop down menu
        this.hidden = true;

        // Saves Paragon Power Levels
        this.paragonLevelsGenerator();

        // Initialising All Variables
        this.currDegree = 0;
        this.sentDegree = 0;
        this.power = 0;
    }

    /**
     * Returns paragon power needed to hit specified degree.
     * @param {Number} degree Paragon Degree
     * @returns {Number} Power that is required
     */
    paragonFunction(degree) {
        if(degree === 1) {
            return 0;
        }
        else if(degree === 100) {
            return 200000;
        }
        else {
            let top = 50*(degree)**3 + 5025*(degree)**2 + 168324*(degree) + 843000;
            return Math.floor(top/600);
        }
    }

    /**
     * Generates an array that contains each level needed to
     * reach that paragon degree. Saves it in `this.paragonLevels`
     */
    paragonLevelsGenerator() {
        let levels = Array.from({length: 100}, (_, i) => i + 1);
        this.paragonLevels = levels.map(this.paragonFunction);
    }

    /**
     * Calculates current degree from power and dispatchs event
     * @returns 
     */
    _degreeCalc() {
        for(let i = 0; i < this.paragonLevels.length; i++) {
            if(this.power < this.paragonLevels[i]) {
                this.currDegree = i;
                this.nextDegree = i+1;
                this._eventDegree();
                return null;
            }
        }
        this.currDegree = 100;
        this.nextDegree = "MAX";
        this._eventDegree();
    }

    /** 
     * Sends updated degree level to paragon damage
    */ 
    _eventDegree() {
        if(!(this.currDegree === this.sentDegree)) {
            this.sentDegree = this.currDegree;
            let e = new CustomEvent("olddegree", { detail: {currDegree: `${this.currDegree}`}});
            window.dispatchEvent(e);
        }
    }

    /**
     * Validates user input from form. Clears input if browser sends 
     * true for invalid input.
     * @param {event} event The event from the form
    */
    _validate(e) {
        // Gets input element that has been given a user input
        let curr = e.originalTarget;

        // Sets input empty if input is invalid
        if(curr.value.length === 0) {
            curr.value = "";
        }

        // Checking Integer Values
        if(parseInt(curr.value) > parseInt(curr.max)) {
            curr.value = curr.max;
        }
        else if(parseInt(curr.value) < parseInt(curr.min)) {
            curr.value = curr.min;
        }
    }

    /**
     * Calculates current power from form values
     * @param {event} event Form event from updating values 
     */
    _formUpdate(e) {
        // Saves Form Element
        let form = e.currentTarget;

        // Zero Power Initially
        this.power = 0;

        // Tier5s
        this.power += form.tier5.value*10000;

        // Upgrades
        this.power += form.towerupgrades.value*100;

        // Money Spent
        this.power += Math.floor(form.moneyspent.value/25);

        // Pops or Income
        let temp = Math.floor(form.popcount.value/180);
        temp += Math.floor(form.incomegenerated.value/45);
        if(temp > 90000) {
            temp = 90000;
        }
        this.power += temp;

        // Totems
        this.power += form.paragontotems.value*2000;

        // Capping Max Power
        if(this.power > 200000) {
            this.power = 200000;
        }
    }

    hideWidget(e) {
        // Finds Button, Header and Div
        let button = e.target;
        let degreeHeader = e.target.parentElement;
        let degreeElement = e.target.parentElement.nextElementSibling;
        
        // Opens/Closes Main Content
        if(this.hidden) {
            button.textContent = "Close";
            degreeElement.hidden = false;
            degreeHeader.style["border-radius"] = "1rem 1rem 0 0";
            degreeHeader.style["border-bottom"] = "2px solid black"
        }
        else {
            button.textContent = "Open";
            degreeElement.hidden = true;
            degreeHeader.style["border-radius"] = "1rem";
            degreeHeader.style["border-bottom"] = "none";
        }
        this.hidden = !this.hidden;
    }

    render() {
        this._degreeCalc();
        return html`
        <header>
            <h1>Paragon Degree Calculator (Pre 39.0)</h1>
            <button @click=${this.hideWidget}>Open</button>
        </header>
        <div hidden>
            <form id="calc" @input=${this._validate} @change=${this._formUpdate}>
                <label for="tier5">Tier 5 Towers (excluding initial 3):</label>
                <input type="number" id="tier5" min=0 max=9 value=0>

                <label for="towerupgrades"><span class="tooltip">Non-Tier 5 Upgrades:<span class="tooltiptext">This includes all upgrade tiers spent on towers excluding any Tier 5 upgrades. Max is 100.</span></span></label>
                <input type="number" id="towerupgrades" min=0 max=100 value=0 step=4>

                <label for="moneyspent"><span class="tooltip">Money Spent (excluding initial 3):<span class="tooltiptext">Total amount spent on towers excluding T5s. Max is $250k.</span></span></label>
                <input type="number" id="moneyspent" min=0 max=250000 value=0 step=500>

                <label for="popcount"><span class="tooltip">Bloons Popped:<span class="tooltiptext">Includes Bloons popped from every tower of the paragon type. Max is 16.2M.</span></span></label>
                <input type="number" id="popcount" min=0 max=16200000 value=0 step=5000>

                <label for="incomegenerated"><span class="tooltip">Cash Generated:<span class="tooltiptext">Applies to Buccaneer & Engineer. Shares same internal power limit as pops. Max is $4.05M.</span></span></label>
                <input type="number" id="incomegenerated" min=0 max=4050000 value=0 step=1000>

                <label for="paragontotems"><span class="tooltip">Geraldo Paragon Power Totems:<span class="tooltiptext">Has no max cap to increase paragon power.</span></span></label>
                <input type="number" id="paragontotems" min=0 value=0>
            </form>
            <p>Current Degree: ${this.currDegree}</p>
            <p>Current Power: ${this.power}</p>
            ${
                this.currDegree < 100 ?
            html`<p>Progress to Next Milestone: (${this.power-this.paragonLevels[this.currDegree-1]} / ${this.paragonLevels[this.currDegree] - this.paragonLevels[this.currDegree-1]})</p>`
            : html`<p>Paragon has reached max level and can not be leveled up further.</p>`
            }
        </div>
        `;
    }
}

customElements.define("oldparagon-calc", oldparagonCalc);