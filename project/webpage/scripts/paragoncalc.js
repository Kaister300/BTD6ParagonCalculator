import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class ParagonCalc extends LitElement {
    static properties = {
        currDegree: {type: Number},
        nextDegree: {type: Number},
        sentDegree: {type: Number},
        paragonLevels: {type: Array},
        paragoncost: {type: Number},
        power: {state: true},
        _paragon: {state: true}
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
            border-radius: 1rem 1rem 0 0;
            border-bottom: 2px solid black;
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

        #paragon_header {
            padding: 0rem 0rem 1rem 0rem;
            text-align: center;
        }

        #paragon_header > h3 {
            margin: auto;
        }

        #paragon_header > h4 {
            margin: auto;
            font-weight: 400;
            font-style: italic;
        }

        #cost {
            margin: 5px;
        }
        #cost label {
            margin: 4px;
        }
        #cost select {
            margin: 4px;
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

        #cashslidercontainer {
            margin: 4px;
            max-width: 15rem;
            border: none;
            display: flex;
        }

        #cashslidercontainer input {
            flex: 1 0 auto;
            align-self: center;
        }

        #cashslidercontainer span {
            align-self: center;
        }

        .warning {
            display: block;
            margin-top: 0.5rem;
            color: red;
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

        // Adds event listener for paragon data
        window.addEventListener(
            "paragon_data", (e) => {
                if (e.detail.paragon) {
                    this._paragon = e.detail.paragon;
                    this.difficulty = e.detail.difficulty;
                    this.paragoncost = this._paragon.prices[this.difficulty];
                }
                else {
                    this._paragon = void 0;
                    this.difficulty = "";
                    this.paragoncost = 0;
                }
                this._validateForm();
                let formEle = document.getElementsByTagName("paragon-calc")[0].shadowRoot.getElementById("calc");
                if (formEle) {
                    this._degreeFormUpdate({"currentTarget": formEle});
                }
            });

        // Sets up drop down menu
        this.hidden = false;

        // Saves Paragon Power Levels
        this.paragonLevelsGenerator();

        // Initialising All Variables
        this.currDegree = 0;
        this.sentDegree = 0;
        this.power = 0;
        this.paragoncost = 0;
        this.difficulty = "";
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
        let found = false;
        for(let i = 0; i < this.paragonLevels.length; i++) {
            if(this.power < this.paragonLevels[i]) {
                this.currDegree = i;
                this.nextDegree = i+1;
                found = true;
                break;
            }
        }
        if (!found) {
            this.currDegree = 100;
            this.nextDegree = "MAX";
        }
        this._eventDegree();
    }

    /** 
     * Sends updated degree level to paragon damage
    */ 
    _eventDegree() {
        if(this.currDegree !== this.sentDegree) {
            this.sentDegree = this.currDegree;
            let e = new CustomEvent("degree", { detail: {currDegree: `${this.currDegree}`}});
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
            // curr.value = "";
            return;
        }

        // Checking Integer Values
        if(parseInt(curr.value) > parseInt(curr.max)) {
            curr.value = curr.max;
        }
        else if(parseInt(curr.value) < parseInt(curr.min)) {
            curr.value = curr.min;
        }

        // Cash Slider Check
        if(curr.id === "cashslider") {
            this._cash_slider_update(e);
        }
    }

    /**
     * Validates entire form to ensure that all values are valid.
     */
    _validateForm() {
        let calc_form = document.getElementsByTagName("paragon-calc")[0].shadowRoot.getElementById("calc");
        
        for(let element of calc_form) {
            this._validate({"originalTarget": element});
        }
    }

    /**
     * Updates element next to slider with numerical value
     * @param {event} e 
     */
    _cash_slider_update(e) {
        let slider = e.originalTarget;
        let slider_p = e.originalTarget.nextElementSibling;
        let maxSliderValue;
        if (slider.value > (maxSliderValue = this._maxSliderValue())) {
            slider.value = maxSliderValue;
        }
        slider_p.textContent = slider.value;
    }

    /**
     * Calculates the max value for the cash slider
     * @returns Maximum value for the cash slider as integer
     */
    _maxSliderValue() {
        return Math.round(3.15 * this.paragoncost + 1);
    }

    /**
     * Calculates current power from form values
     * @param {event} event Form event from updating values 
     */
    _degreeFormUpdate(e) {
        // Saves Form Element
        let form = e.currentTarget;

        // Zero Power Initially
        this.power = 0;

        // Tier5s. Max is 50,000 power
        if(form.tier5.value) {
            this.power += form.tier5.value*6000;
            if(this.power > 50000) this.power = 50000;
        }
        
        // Upgrades. Max is 10,000 power
        if(form.towerupgrades.value) this.power += form.towerupgrades.value*100;

        // Money Spent. Max is 60,000 power
        if(this.paragoncost !== 0) {
            let costpower = 0;

            // Money Spent
            if(form.moneyspent.value) {
                let spentratio = this.paragoncost/20000
                costpower += Math.floor(form.moneyspent.value/spentratio);
            }

            // Cash Slider
            if(form.cashslider.value) {
                let sliderratio = this.paragoncost*1.05/20000;
                costpower += Math.floor(form.cashslider.value/sliderratio);
            }

            if(costpower > 60000) costpower = 60000;
            this.power += costpower;
        }

        // Pops or Income. Max is 90,000 power
        let temp = 0;
        if(form.popcount.value) temp += Math.floor(form.popcount.value/180);
        if(form.incomegenerated.value) temp += Math.floor(form.incomegenerated.value/45);
        if(temp > 90000) temp = 90000;
        this.power += temp;
        

        // Totems. No Max
        if(form.paragontotems.value) this.power += form.paragontotems.value*2000;

        // Capping Total Max Power
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
        const paragonSliderMax = this._maxSliderValue();
        return html`
        <header>
            <h1>Paragon Degree Calculator (Post 39.0)</h1>
            <button @click=${this.hideWidget}>Close</button>
        </header>
        <div>
            <div id="paragon_header">
                <h3>
                    ${this._paragon ?
                    this._paragon.name
                    : `Please select a Paragon`}
                </h3>
                <h4>
                    ${this.difficulty ?
                    this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)
                    : `-----`}
                </h4>
            </div>

            <form id="calc" @input=${this._validate} @change=${this._degreeFormUpdate}>
                <label for="tier5">Tier 5 Towers (excluding initial 3):</label>
                <input type="number" id="tier5" min=0 max=9 value=0>

                <label for="towerupgrades"><span class="tooltip">Non-Tier 5 Upgrades:<span class="tooltiptext">This includes all upgrade tiers spent on towers excluding any Tier 5 upgrades. Max is 100.</span></span></label>
                <input type="number" id="towerupgrades" min=0 max=100 value=0 step=4>

                <label for="moneyspent"><span class="tooltip">Money Spent (excluding initial 3):<span class="tooltiptext">Total amount spent on towers excluding T5s. Max is $${3*this.paragoncost}.</span></span></label>
                <input type="number" id="moneyspent" min=0 max=${3*this.paragoncost} value=0 step=500>

                <label for="popcount"><span class="tooltip">Bloons Popped:<span class="tooltiptext">Includes Bloons popped from every tower of the paragon type. Max is 16.2M.</span></span></label>
                <input type="number" id="popcount" min=0 max=16200000 value=0 step=5000>

                <label for="incomegenerated"><span class="tooltip">Cash Generated:<span class="tooltiptext">Applies to Buccaneer & Engineer. Shares same internal power limit as pops. Max is $4.05M.</span></span></label>
                <input type="number" id="incomegenerated" min=0 max=4050000 value=0 step=1000>

                <label for="paragontotems"><span class="tooltip">Geraldo Paragon Power Totems:<span class="tooltiptext">Has no max cap to increase paragon power.</span></span></label>
                <input type="number" id="paragontotems" min=0 value=0>

                <label for="cashslider"><span class="tooltip">Cash Injection:<span class="tooltiptext">This is the cash injection that is allowed to be spent on the paragon. This is 3.15 times the base paragon cost. Max is $${paragonSliderMax}.</span></span></label>
                <span id="cashslidercontainer"><input type="range" id="cashslider" min=0 max=${paragonSliderMax} value=0 step=1 @input=${this._cash_slider_update}><span>0</span></span>
            </form>
            <p>Current Degree: ${this.currDegree}</p>
            <p>Current Power: ${this.power}</p>
            ${
                this.currDegree < 100 ?
            html`<p>Progress to Next Milestone: (${this.power-this.paragonLevels[this.currDegree-1]} / ${this.paragonLevels[this.currDegree] - this.paragonLevels[this.currDegree-1]})</p>`
            : html`<p>Paragon has reached max level and can not be leveled up further.</p>`
            }
            ${this.paragoncost ?
            html`<span class="warning"><strong>NOTE:</strong> The cash injection is 3.15 times the base paragon cost. This would mean that the total cash injection allowed would be $${paragonSliderMax}</span>`
            : html`<span class="warning"><strong>NOTE:</strong> Please choose the Paragon and Difficulty first.</span>`
            }
        </div>
        `;
    }

    // updated() {
    //     this._validateForm();
    // }
}

customElements.define("paragon-calc", ParagonCalc);