require('jasmine-ajax')

describe('Gather and display magnificant seven', function() {

    beforeEach(function() {
      jasmine.Ajax.install();
    });
  
    afterEach(function() {
      jasmine.Ajax.uninstall();
    });
    
    it('player retrieval calls the expected url', function() {
        getPlayersFromFantasyPremierLeagueApi();
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('https://fantasy.premierleague.com/iq/elements/');
    });

    it('position retrieval calls the expected url', function() {
        getPlayerPositionsFromFantasyPremierLeagueApi();
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('https://fantasy.premierleague.com/iq/element-types/');
    });

    describe("Get Players", function() {
        beforeEach(function() {
            getPlayersFromFantasyPremierLeagueApi();
            request = jasmine.Ajax.requests.mostRecent();
            request.respondWith(TestResponses.getPlayers.success);
        });

        it('when getPlayers is called the expected url is called and mock data is returned when in tests', function() {
            getPlayersFromFantasyPremierLeagueApi();
            expect(getPlayerCount()).toBe(JSON.parse(TestResponses.getPlayers.success.responseText).length);
        });

        it('when calculateMagnificence is called magnificence is calculated and added to the player object', function() {
            players[0] = {web_name:'Player One',goals_scored:0, assists:0};
            players[1] = {goals_scored:99, assists:100};
            players[2] = {goals_scored:3, assists:2};
            players[3] = {goals_scored:0, assists:10};
            players[4] = {goals_scored:20, assists:0};
            
            calculateMagnificence(players);

            expect(players[0].magnificence).toBe(0);
            expect(players[0].web_name).toBe('Player One');
            expect(players[1].magnificence).toBe(199);
            expect(players[2].magnificence).toBe(5);
            expect(players[3].magnificence).toBe(10);
            expect(players[4].magnificence).toBe(20);
        });
    });

    describe("Get Positions", function() {
        beforeEach(function() {
            getPlayerPositionsFromFantasyPremierLeagueApi();
            request = jasmine.Ajax.requests.mostRecent();
            request.respondWith(TestResponses.getPlayerPositions.success);
        });

        it('when GetPlayersPositions is called the expected test response is called when tests are executed', function() {
            getPlayerPositionsFromFantasyPremierLeagueApi();
            expect(getPlayerPositionsCount()).toBe(JSON.parse(TestResponses.getPlayerPositions.success.responseText).length);
            expect(getPlayerPositions()[0].singular_name).toBe("Made up position name");
        });
    });    

    describe("Data Formatting", function() {
        it('when groupPlayers is called the players are grouped as expected', function() {
            //given
            positions = JSON.parse(TestResponses.getPlayerPositions.success.responseText);
            players = [];
            players[0] = {element_type:1};
            players[1] = {element_type:2};
            players[2] = {element_type:1};
            players[3] = {element_type:2};
            players[4] = {element_type:2};
            players[5] = {element_type:3};
            
            //when I request players sorted by group
            groupPlayers();

            //and I get expeccted number of players for each group
            expect(getGroupedPlayers()[1].players.length).toBe(2);
            expect(getGroupedPlayers()[2].players.length).toBe(3);
            expect(getGroupedPlayers()[3].players.length).toBe(1);
        });
 
        it('when sortGroupedPlayers is called the players are sorted as expected', function() {
            //given
            positions = [{id:99}]
            groupedPlayers={99:{players:[{id:1,magnificence:5},{id:9,magnificence:2},{id:76,magnificence:99}]}};
            
            //when I request players sorted by group
            sortGroupedPlayers();

            //I get expeccted number of players for each group
            expect(getGroupedPlayers()[99].players[0].id).toBe(76);
            expect(getGroupedPlayers()[99].players[1].id).toBe(1);
            expect(getGroupedPlayers()[99].players[2].id).toBe(9);
        });
 
        it('when prepareViewModel is called the necessary player counts per position are correct', function() {
            //given
            positions = JSON.parse(TestResponses.getPlayerPositions.success.responseText);
            players = [];
            players[0] = {element_type:1};
            players[1] = {element_type:1};
            players[2] = {element_type:1};
            players[3] = {element_type:1};
            players[4] = {element_type:2};
            players[5] = {element_type:2};
            players[6] = {element_type:2};
            players[7] = {element_type:2};
            players[8] = {element_type:3};
            players[9] = {element_type:3};
            players[10] = {element_type:3};
            players[11] = {element_type:3};
            players[12] = {element_type:4};
            players[13] = {element_type:4};
            players[14] = {element_type:4};
            players[15] = {element_type:4};
            groupPlayers();
            

            //when I prepare the view model
            prepareViewModel();

            //I get the expeccted number of players for each group
            expect(getGroupedPlayers()[1].group.singular_name_short).toBe("GKP");
            expect(getGroupedPlayers()[1].players.length).toBe(1);
            
            expect(getGroupedPlayers()[2].group.singular_name_short).toBe("DEF");
            expect(getGroupedPlayers()[2].players.length).toBe(2);

            expect(getGroupedPlayers()[3].group.singular_name_short).toBe("MID");
            expect(getGroupedPlayers()[3].players.length).toBe(3);

            expect(getGroupedPlayers()[4].group.singular_name_short).toBe("FWD");
            expect(getGroupedPlayers()[4].players.length).toBe(1);
        });
    });    

    describe("Data display", function() {
        it('when display players is called each one is added to the dom', function() {
            //given
            //when I call display players
            //then addToDomMethodIdCalledWithEachPlayer    
        });
    });
});
