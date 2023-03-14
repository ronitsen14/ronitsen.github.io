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