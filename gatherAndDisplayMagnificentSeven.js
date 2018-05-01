var players;
var positions;
var groupedPlayers = {};

displayMagnificent7 = function(){
    getPlayersFromFantasyPremierLeagueApi().then(function(){
        return getPlayerPositionsFromFantasyPremierLeagueApi();
    }).then(function(){
        return calculateMagnificence();
    }).then(function(){
        return groupPlayers();
    }).then(function(){
        return sortGroupedPlayers();
    }).then(function(){
        return prepareViewModel();
    }).then(function(){
        console.log('Finished Loading Initial View Model');
    });
    
    // displayPlayers();
}

addPlayerToDom = function(player){
    var el = document.createElement('div');
    var domString = '<div id="player"><span class="name">'+player.first_name+' '+player.second_name+'</span><span>('+player.magnificence+')</span></div>';
    el.innerHTML =  domString;
    document.body.appendChild(el.firstChild); 
};

displayPlayers = function(){
    console.log("About to display players");
    for(i=0; i<players.length; i++){
        addPlayerToDom(players[i]);
    }
    console.log("Finished displaying players");
}

calculateMagnificence = function(){
    return new Promise(function(resolve, reject) {
        console.log("About to calculate magnificence");
        for(i=0; i<players.length; i++){
            players[i].magnificence = players[i].goals_scored + getPlayers()[i].assists;
        }
        console.log("Finished calculating magnificence");
        resolve();
    });
}

getPlayersFromFantasyPremierLeagueApi = function(){ 
    return new Promise(function(resolve, reject) {
        console.log("About to get players from api");
        function getPlayersSuccessHandler () {
            players = JSON.parse(this.responseText);
            resolve();
            console.log("Finished get players from api");
        }
        
        var newXHR = new XMLHttpRequest();
        newXHR.addEventListener( 'load', getPlayersSuccessHandler );
        newXHR.open('GET', 'https://fantasy.premierleague.com/iq/elements/');
        newXHR.send();
    });
}

getPlayerPositionsFromFantasyPremierLeagueApi = function(){
    return new Promise(function(resolve, reject) {
        console.log("About to get positions from api");
        function getPlayerPositionsSuccessHandler() {
            positions = JSON.parse(this.responseText);       
            console.log("Finished get positions from api");
            resolve();
        }
        
        var newXHR = new XMLHttpRequest();
        newXHR.addEventListener('load', getPlayerPositionsSuccessHandler);
        newXHR.open('GET', 'https://fantasy.premierleague.com/iq/element-types/');
        newXHR.send();
    }); 
}

getPlayerCount = function(){
    return players.length;
}

getPlayers = function(){
    return players;
}

getPlayerPositionsCount = function(){
    return positions.length;
}

getPlayerPositions = function(){
    return positions;
}

groupPlayers = function(){
    return new Promise(function(resolve, reject) {
        console.log("About to groupPlayers");
        for(i=0; i < positions.length; i++){
            //Could create javascript object
            var newGrouping = {id:positions[i].id, group:positions[i], players:[]};
            groupedPlayers[positions[i].id] = newGrouping;
        }
        for(i=0; i < players.length; i++){
            groupedPlayers[players[i].element_type]['players'].push(players[i]);
        }
        console.log("Finished groupPlayers");
        resolve();
    });
}

sortGroupedPlayers = function(){
    return new Promise(function(resolve, reject) {
        console.log("About to sort grouped players");
        for(i=0; i < positions.length; i++){
            groupedPlayers[positions[i].id]['players'] = groupedPlayers[positions[i].id]['players'].sort(function(a, b) {
                return b['magnificence'] - a['magnificence'];
            });
            }
        console.log("Finished sorting grouped players"); 
        resolve();
    });
}

prepareViewModel = function(){
    return new Promise(function(resolve, reject) {
        console.log("Starting to prepare view model"); 
        for(i=0; i < positions.length; i++){
            if(positions[i].singular_name_short === "GKP"){
                groupedPlayers[positions[i].id]['players'] = groupedPlayers[positions[i].id]['players'].slice(0,1);
            }else if (positions[i].singular_name_short === "DEF"){
                groupedPlayers[positions[i].id]['players'] = groupedPlayers[positions[i].id]['players'].slice(0,2);
            }else if (positions[i].singular_name_short === "MID"){
                groupedPlayers[positions[i].id]['players'] = groupedPlayers[positions[i].id]['players'].slice(0,3);
            }else if (positions[i].singular_name_short === "FWD"){
                groupedPlayers[positions[i].id]['players'] = groupedPlayers[positions[i].id]['players'].slice(0,1);
            }
        }
        console.log("Finished prepare view model"); 
        resolve();
    });
}

getGroupedPlayers = function(){
    return groupedPlayers;
}