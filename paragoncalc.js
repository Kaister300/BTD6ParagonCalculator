import {LitElement, html, css,} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class paragonCalc extends LitElement {
    static properties = {
        currDegree: {type: Number},
        nextDegree: {type: Number},
        paragonLevels: {type: Array},
        tierfives: {state: true},
        upgrades: {state: true},
        spent: {state: true},
        pops: {state: true},
        income: {state: true},
        totems: {state: true},
        basePower: {state: true},
    };

    static styles = css`
        :host {
            background-color: #EAFFFD;
            display: block;
            max-width: 50rem;
            padding: 1rem;
            margin: auto;
            border-radius: 0 0 1rem 1rem;
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

        .tooltip {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
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
          
          /* Show the tooltip text when you mouse over the tooltip container */
          .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
          }
    `;

    constructor() {
        super();
        this.paragonLevelsGenerator();
        this.currDegree = 0;
        this.tierfives = 0;
        this.upgrades = 1200;
        this.spent = 0;
        this.pops = 0;
        this.income = 0;
        this.totems = 0;
    }

    // Paragon Power Levels
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

    paragonLevelsGenerator() {
        let levels = Array.from({length: 100}, (_, i) => i + 1);
        this.paragonLevels = levels.map(this.paragonFunction);
        console.log(this.paragonLevels);
    }

    _degreeCalc() {
        for(let i = 0; i < this.paragonLevels.length; i++) {
            if(this.basePower < this.paragonLevels[i]) {
                this.currDegree = i;
                this.nextDegree = i+1;
                return i;
            }
        }
        this.currDegree = 100;
        this.nextDegree = "MAX";
    }

    // Form Validation
    _validate() {
        let formDoc = document.querySelector('paragon-calc').shadowRoot.querySelector('form');
        for(let i = 0; i < formDoc.length; i++) {
            let curr = formDoc[i];

            // Cleaning input
            curr.value = curr.value.replace('-', '');
            curr.value = curr.value.replace('.', '');

            if(curr.value === '') {
                curr.value = curr.min;
            }

            // Checking Integer Values
            if(parseInt(curr.value) > parseInt(curr.max)) {
                curr.value = curr.max;
            }
            else if(parseInt(curr.value) < parseInt(curr.min)) {
                curr.value = curr.min;
            }
        }
    }

    // Form Updates
    _tierfiveupdate(e) {
        this.tierfives = e.target.value*10000;
    }
    _upgradeupdate(e) {
        this.upgrades = e.target.value*100;
    }
    _spentupdate(e) {
        this.spent = Math.floor(e.target.value/25);
    }
    _popupdate(e) {
        this.pops = Math.floor(e.target.value/180);
    }
    _incomeupdate(e) {
        this.income = Math.floor(e.target.value/45);
    }
    _totemupdate(e) {
        this.totems = e.target.value*2000;
    }

    // Calculates power from inputs
    _powerComputation() {
        // Zero power initially
        this.basePower =  0
        
        // Tier5s
        this.basePower += this.tierfives;

        // Upgrades
        this.basePower += this.upgrades;

        // Money Spent
        this.basePower += this.spent;

        // Pops or Income
        let temp = this.pops + this.income
        if(temp > 90000) {
            temp = 90000;
        }
        this.basePower += temp;
       
        // Totems
        this.basePower += this.totems;

        if(this.basePower > 200000) {
            this.basePower = 200000
        }
    }

    render() {
        this._powerComputation();
        this._degreeCalc();
        return html`
        <div>
            <form id="calc">
                <label for="tier5">Tier 5 Towers (excluding initial 3):</label>
                <input type="number" id="tier5" min=0 max=9 value=0 @input=${this._validate} @change=${this._tierfiveupdate}>

                <label for="towerupgrades"><span class="tooltip">Non-Tier 5 Upgrades:<span class="tooltiptext">This includes all upgrade tiers spent on towers excluding any Tier 5 upgrades. Max is 100.</span></span></label>
                <input type="number" id="towerupgrades" min=0 max=100 value=12 @input=${this._validate} @change=${this._upgradeupdate}>

                <label for="moneyspent"><span class="tooltip">Money Spent (excluding initial 3):<span class="tooltiptext">Total amount spent on towers excluding T5s. Max is $25k.</span></span></label>
                <input type="number" id="moneyspent" min=0 max=250000 value=0 @input=${this._validate} @change=${this._spentupdate}>

                <label for="popcount"><span class="tooltip">Bloons Popped:<span class="tooltiptext">Includes Bloons popped from every tower of the paragon type. Max is 16.2M.</span></span></label>
                <input type="number" id="popcount" min=0 max=16200000 value=0 @input=${this._validate} @change=${this._popupdate}>

                <label for="incomegenerated"><span class="tooltip">Cash Generated:<span class="tooltiptext">Only applies to xx3+ Monkey Buccaneer. Shares same internal power limit as pops. Max is $4.05M.</span></span></label>
                <input type="number" id="incomegenerated" min=0 max=4050000 value=0 @input=${this._validate} @change=${this._incomeupdate}>

                <label for="paragontotems"><span class="tooltip">Geraldo Paragon Power Totems:<span class="tooltiptext">Has no max cap to increase paragon power.</span></span></label>
                <input type="number" id="paragontotems" min=0 value=0 @input=${this._validate} @change=${this._totemupdate}>
            </form>
            <p>Current Degree: ${this.currDegree}</p>
            <p>Current Power: ${this.basePower}</p>
            ${
                this.currDegree < 100 ?
            html`<p>Progress to Next Milestone: (${this.basePower-this.paragonLevels[this.currDegree-1]} / ${this.paragonLevels[this.currDegree] - this.paragonLevels[this.currDegree-1]})</p>`
            : html`<p>Paragon has reached max level and can not be leveled up further.</p>`
            }
        </div>`;
    }
}

customElements.define("paragon-calc", paragonCalc);