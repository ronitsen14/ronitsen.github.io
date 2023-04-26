(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <h1>Hello World</h1>
    `;

    customElements.define('com-sap-sample-helloworld1', class RSSDataSource extends HTMLElement {
	constructor() {
	    super();
            this.appendChild(tmpl.content.cloneNode(true));

            this._props = {
                JSONUrl: "https://uat.logpoint.com/rss/incidents",
                RefreshTime: 300
            };

            //Get refrences to our root element
            this.$div = this.querySelector('div.datasource');

            //Add the handler for our refresh button 
            this.$div.querySelector('#refresh').onclick = (e) => this.refresh();
        }
        
        refresh() {
            if(this._props["JSONUrl"]) {
                this.updateData(this._props["JSONUrl"])
            }
        }

	    
	updateData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        this._rawData = data;

        this.startRefreshCountdown();

        const event = new Event("onDataUpdate");
        this.dispatchEvent(event);
    });
}   

        startRefreshCountdown() {
            if(this._refreshTimeout) clearTimeout(this._refreshTimeout);

            this._refreshTimeout = setTimeout(() => this.refresh(), this._props["RefreshTime"] * 1000);

            const end = new Date().getTime() + (this._props["RefreshTime"] * 1000);

            if(this._countdownInterval) clearInterval(this._countdownInterval);

            this._countdownInterval = setInterval(() => {
                let now = new Date().getTime();
                let distance = end - now;

                let timestring = distance > 60000 ? Math.floor(distance / (1000 * 60)) + " Minutes" : Math.floor(distance / (1000)) + " Seconds";

                this.$div.querySelector(".refresh-timer .value").innerText = timestring; 
            }, 1000);
        }

        onCustomWidgetBeforeUpdate(oChangedProperties) {
            let oldUrl = this._props['JSONUrl'];
            let newUrl = oChangedProperties['JSONUrl'];

            if(newUrl != oldUrl) {
                this.updateData(newUrl);
            }

            this._props = { ...this._props, ...oChangedProperties};
	}
	    getRawData() {
    return this._rawData || {};
}

getJSONData(type) {
    let data = {};

    if(type == "raw") {
        data = this.getRawData();
    }

    return JSON.stringify(data);
}
});
})();
