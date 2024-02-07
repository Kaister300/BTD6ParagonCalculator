import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class paragonSelector extends LitElement {
    static properties = {
        _paragon: {state: true},
        currParagon: {type: String},
        sentParagon: {type: String},
        difficulty: {type: String}
    }

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

        #selector {
            margin: 5px;
        }
        #selector label {
            margin: 4px;
        }
        #selector select {
            margin: 4px;
        }
    `;
    
    constructor() {
        super();

        // Sets up drop down menu
        this.hidden = false;

        // Initialise All Variables
        this.currParagon = void 0;
        this.sentParagon = void 0;
        this.difficulty = "easy";
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

    /** 
     * Sends paragon data to other widgets
    */ 
    _eventDegree() {
        let e = new CustomEvent(
            "paragon_data", 
                {
                    detail: 
                        {
                            paragon: this._paragon,
                            difficulty: this.difficulty
                        }
                }
            );
        window.dispatchEvent(e);
    }

    /**
     * Sets up data to grab selected paragon
     * @param {event} e Form event from updating values 
     */
    async _paragonFormUpdate(e) {
        let form = e.currentTarget;

        // Resets paragon json data
        if(form.paragon.value === "") {
            this._paragon = void 1;
        }
        else {
            // Fetches paragon data if not already fetched
            if(!this._paragon || !(this.currParagon === form.paragon.value)) {
                let arr = form.paragon.value.split(";");
                console.log(`${window.location.href}paragons/${arr[0]}/${arr[1]}.json`);
                await fetch(`${window.location.href}paragons/${arr[0]}/${arr[1]}.json`)
                .then(response => response.json())
                .then(data => this._paragon = data.paragon)
                .then(() => console.log(this._paragon));
                this.currParagon = form.paragon.value;
            }
        }

        // Sets difficulty
        this.difficulty = form.difficulty.value;
        this._eventDegree();
    }

    render() {
        return html`
        <header>
            <h1>Paragon Selector</h1>
            <button @click=${this.hideWidget}>Close</button>
        </header>
        <div>
            <form id="selector" @change=${this._paragonFormUpdate}>
                <label for="paragon">Choose Paragon: </label>
                <select id="paragon">
                    <option value="">Please choose an option</option>
                    <optgroup label="Primary">
                        <option value="primary;dart">Dart Monkey</option>
                        <option value="primary;boomerangm">Boomerang Monkey</option>
                    </optgroup>
                    <optgroup label="Military">
                        <option value="military;buccaneer">Monkey Buccaneer</option>
                        <option value="military;ace">Monkey Ace</option>
                        <option value="military;sub">Monkey Sub</option>
                    </optgroup>
                    <optgroup label="Magic">
                        <option value="magic;ninja">Ninja Monkey</option>
                        <option value="magic;wizard">Wizard Monkey</option>
                    </optgroup>
                    <optgroup label="Support">
                        <option value="support;engineer">Engineer Monkey</option>
                    </optgroup>
                </select><br>

                <label for="difficulty">Choose Difficulty: </label>
                <select id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="impoppable">Impoppable</option>
                </select>
            </form>
        </div>
        `;
    }
}

customElements.define("paragon-selector", paragonSelector);