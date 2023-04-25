let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
            .datasource {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .datasource > div {
                display: inline-block;
                vertical-align: middle;
            }

            .data-age, .refresh-timer {
                margin: 0px 12px;
            }

            .data-age > * {
                display: inline-block;
                vertical-align: middle;
            }

            .refresh-timer > * {
                display: inline-block;
                vertical-align: middle;
            }
        </style>
        <div class="datasource">
            <div class="data-age">
                <div class="label">Last Refreshed:</div>
                <div class="value">Loading</div>
            </div>
            <div class="refresh-timer">
                <div class="label">Next Refresh:</div>
                <div class="value">Never</div>
                <button id="refresh">Refresh Now</button>
            </div>
        </div>
    `;

customElements.define('custom-button', class HelloWorld1 extends HTMLElement {


		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
            redraw()
        }
        */

        redraw(){
        }
    });
})();
