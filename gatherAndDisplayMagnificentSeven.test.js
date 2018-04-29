require('jasmine-ajax')

describe('Gather and display', function() {

    beforeEach(function() {
      jasmine.Ajax.install();
    });
  
    afterEach(function() {
      jasmine.Ajax.uninstall();
    });
    
    it('getPlayerCallsExpectedUrlForPlayers', function() {
        getPlayersFromFantasyPremierLeagueApi();
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('https://fantasy.premierleague.com/iq/elements/');
    });

    it('getPlayerCallsExpectedUrlForPositions', function() {
        getPlayerPositionsFromFantasyPremierLeagueApi();
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('https://fantasy.premierleague.com/iq/element-types/');
    });

    describe("Get Players", function() {
        beforeEach(function() {
            getPlayersFromFantasyPremierLeagueApi();
            request = jasmine.Ajax.requests.mostRecent();
            request.respondWith(TestResponses.getPlayers.success);
        });

        it('whenGetPlayersCallsExpectedUrlAndTestResponseIsReturnedWhileTestsAreExecuted', function() {
            getPlayersFromFantasyPremierLeagueApi();
            expect(getPlayerCount()).toBe(JSON.parse(TestResponses.getPlayers.success.responseText).length);
        });

        it('whenCalculateMagnificenceIsCalledTheMagnificenceValueIsCalculatedAndAddedToThePlayerObject', function() {
            players[0] = {web_name:'Player One',goals_scored:0, assists:0};
            players[1] = {goals_scored:99, assists:100};
            players[2] = {goals_scored:3, assists:2};
            players[3] = {goals_scored:0, assists:10};
            players[4] = {goals_scored:20, assists:0};
            
            calculateMagnificence(players);

            expect(players[0].magnificence).toBe(0);
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

        it('when GetPlayersPositions is called the expected test response is called when tests are ezecuted', function() {
            getPlayerPositionsFromFantasyPremierLeagueApi();
            expect(getPlayerPositionsCount()).toBe(JSON.parse(TestResponses.getPlayerPositions.success.responseText).length);
            console.log(getPlayerPositions()[0].singular_name);
            expect(getPlayerPositions()[0].singular_name).toBe("Made up position name");
        });
    });    
});
