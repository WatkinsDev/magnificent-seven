var players;
var positions;

displayMagnificent7 = function(){
    getPlayersFromFantasyPremierLeagueApi();    
}

addPlayerToDom = function(player){
    var el = document.createElement('div');
    var domString = '<div id="player"><span class="name">'+player.first_name+' '+player.second_name+'</span><span>('+player.magnificence+')</span></div>';
    el.innerHTML =  domString;
    document.body.appendChild(el.firstChild); 
};

displayPlayers = function(players){
    console.log("About to display players");
    for(i=0; i<players.length; i++){
        addPlayerToDom(players[i]);
    }
    console.log("Finished displaying players");
}

calculateMagnificence = function(players){
    console.log("About to calculate magnificence");
    for(i=0; i<players.length; i++){
        players[i].magnificence = players[i].goals_scored + players[i].assists;
    }
    console.log("Finished calculating magnificence");
}

getPlayersFromFantasyPremierLeagueApi = function(){ 
  function getPlayersSuccessHandler () {
    players = JSON.parse(this.responseText);
    calculateMagnificence(players);
    displayPlayers(players);
  }
  
  var newXHR = new XMLHttpRequest();
  newXHR.addEventListener( 'load', getPlayersSuccessHandler );
  newXHR.open('GET', 'https://fantasy.premierleague.com/iq/elements/');
  newXHR.send();
}

getPlayerPositionsFromFantasyPremierLeagueApi = function(){
    function getPlayerPositionsSuccessHandler() {
        positions = JSON.parse(this.responseText);
    }
    
    var newXHR = new XMLHttpRequest();
    newXHR.addEventListener('load', getPlayerPositionsSuccessHandler);
    newXHR.open('GET', 'https://fantasy.premierleague.com/iq/element-types/');
    newXHR.send();        
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