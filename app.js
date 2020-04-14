var updater = (function() {
    var request = new XMLHttpRequest();
    var DOMstrings = {
        confCase: 'confirm-cases',
        confDelta: 'confirm-delta',
        actCase: 'active-cases',
        recCase: 'recovered-cases',
        recDelta: 'recovered-delta',
        dedCase: 'death-cases',
        dedDelta: 'death-delta',
    }

    return {
        update: function(){
            request.open('GET', 'https://api.covid19india.org/data.json', true)

            request.onload = function() {
                var data = JSON.parse(this.response)
                document.getElementById(DOMstrings.confDelta).innerText = '[+' + data.statewise[0].deltaconfirmed + ']'
                document.getElementById(DOMstrings.confCase).innerText = data.statewise[0].confirmed

                document.getElementById(DOMstrings.actCase).innerText = data.statewise[0].active

                document.getElementById(DOMstrings.recCase).innerText = data.statewise[0].recovered
                document.getElementById(DOMstrings.recDelta).innerText = '[+' + data.statewise[0].deltarecovered + ']'
                
                document.getElementById(DOMstrings.dedCase).innerText = data.statewise[0].deaths
                document.getElementById(DOMstrings.dedDelta).innerText = '[+' + data.statewise[0].deltadeaths + ']'

                document.getElementById('time').innerText = 'Last Updated: ' + data.statewise[0].lastupdatedtime;
            };

            request.send();
            console.log('Updated!');
        },
    }
})();

document.querySelector('.refresh-btn').addEventListener('click', function(){
    updater.update();
});
//updater.update();