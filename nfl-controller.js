function NflController() {
    var nflService = new NflService(ready);
    var rosterElem = document.getElementById('roster')
    var myElem = document.getElementById('my-team')

    function ready() {
        $('some-button').on('click', function() {
            var teamSF = playerService.getPlayersByTeam("SF");
        })
    }

    //PUBLIC

    
function drawRoster(arr) {
        var arr = nflService.getResults()
        var template = ''
        for (var i = 0; i < arr.length; i++) {
            var player = arr[i]
            template += `
            <div class="col-sm-3 player-card">
            <img src="${player.photo}" alt="player profile">
            <h3>${player.fullname}</h3>
            <h4>${player.position}</h4>
            <h4>${player.pro_team}</h4>
            <button onclick="app.controllers.nflCtrl.addToTeam(${player.id})" class="btn btn-success">Add to Team</button>
            </div>
            `
        }
        rosterElem.innerHTML = template
    }
    
    this.searchName = function searchName(event) {
        event.preventDefault();
        var formData = event.target
        var name = formData.name.value
        nflService.getPlayerByName(name)
        drawRoster()
    }
    this.searchPosition = function searchPosition(event) {
        event.preventDefault();
        var formData = event.target
        var position = formData.position.value
        nflService.getPlayerByPosition(position)
        drawRoster()
    }
    this.searchTeam = function searchTeam(event) {
        event.preventDefault();
        var formData = event.target
        var team = formData.team.value
        nflService.getPlayerByTeam(team)
        drawRoster()
    }


    this.addToTeam = function addToTeam(id) {
        nflService.addToTeam(id)
        drawMyTeam()
    }

    this.removeFromTeam = function removeFromTeam(id) {
        nflService.removeFromTeam(id)
        drawMyTeam()
    }

    function drawMyTeam(arr) {
        var arr = nflService.getMyTeam()
        var template = ''
        for (var i = 0; i < arr.length; i++) {
            var player = arr[i]
            template += `
            <div class="col-sm-6 my-team">
            <img src="${player.photo}" alt="player profile" class="my-photo">
            <h3>${player.fullname}</h3>
            <h4>${player.position}</h4>
            <button onclick="app.controllers.nflCtrl.removeFromTeam(${player.id})" class="btn btn-danger">Remove</button>
            </div>
            `
        }
        myElem.innerHTML = template
    }
}