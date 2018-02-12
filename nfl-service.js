function NflService(callback) {

    var playersData = [];
    var filteredPlayers = [];
    var myTeam = []

    function loadPlayersData() {

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback();
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
    }

    this.getPlayerByPosition = function getPlayerByPosition(position) {
        filteredPlayers = []
        playersData.forEach(function (player) {
            if (player.position.toLowerCase() === position.toLowerCase()) {
                filteredPlayers.push(player);
            }
        })
        return filteredPlayers
    }

    this.getPlayerByName = function getPlayerByName(name) {
        filteredPlayers = []
        playersData.forEach(function (player) {
            if (player.fullname.toLowerCase().includes(name.toLowerCase())) {
                filteredPlayers.push(player);
            }
        })
        return filteredPlayers
    }

    this.getPlayerByTeam = function getPlayerByTeam(team) {
        filteredPlayers = []
        playersData.forEach(function (player) {
            if (player.pro_team.toLowerCase() == team.toLowerCase()) {
                filteredPlayers.push(player);
            }
        })
        return filteredPlayers
    }



    this.getResults = function getResults() {
        return filteredPlayers
    }

    this.addToTeam = function addToTeam(id) {
        var roster = playersData
        for (let i = 0; i < roster.length; i++) {
            var player = roster[i];
            if (myTeam.length == 13) {
                return swal('Your Team is Full!', "You can only have 13 Team Members.", "error");
            }
            else if(player.id == id) {
                myTeam.push(player)
            }
        }
        return myTeam
    }

    this.removeFromTeam = function removeFromTeam(id) {
        var list = myTeam
        for (let i = 0; i < list.length; i++) {
            const player = list[i];
            if (player.id == id) {
                myTeam.splice(i, 1)
            }
        }
        return myTeam
    }

    this.getMyTeam = function getMyTeam() {
        return myTeam
    }

    loadPlayersData();
    console.log(playersData)
}