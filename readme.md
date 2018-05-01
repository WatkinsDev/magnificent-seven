This is my attempt at creating a "Mangnificent 7" for the fantasy premier league. "Megnificence" is a numerical representation of goals scored and goals directly assisted. 

**Notes**
- karma installed globally by running "npm install karma -g" and "npm install -g karma-cli" but npm test should invoke .bin version from node_modules
- Developed on windows so made attempts to ensure linux/osx compatability but unable to verify
- Could calculate magnificence on the server side to prevent repeated client side calculation

**Stories Completed**
0.5 Display full list of players
0.5 Calculate and display magnificence (goals + assists) per player 
0.5 Group players by position
0.5 Sort players by magnificence
0.5 Limit display to 1 keeper, 2 defenders, 3 midfielders and 1 forward

**Story Backlog**
1 Beutify position decoration
1 Beutify team decoration
0.5 Display player team
0.5 Display calculation
- See below for further enhancements to potential be added to the backlog 

**Cross cutting concerns**
- Responsiveness
- Tested
- Limit/reduce api reads
- Error handling

**Potential Enhancements (reword these to ensure they are baseda round their intention. "Quick epic (large story) requirement discussion with product managers could turn these into desired value and not solution**
- Cover "unhappy path" scenarios with tests and display 
- Internationalisation and accessibility scan
- Display value 
- Highlight where included in team
- Display actual points
- Share buttons etc
- Manificence per 90 minutes
- Points per £million pound player cost 
- Show trends
- Highlight cheap players or show "cheap squad" where players are all of lesser value
- Show most and least picked
- Display liklihood of being dropped/injured
- Highlight players "overachieving"?

**Potential technical enhancements**
- Extract javascript functions into suitable "classes" and split tests accordingly 
- Change promises to spread to run all api calls at once
- Loop less by combining functionality
- Filter on elements?
- Caching of data (aimed towards static loading of screens where necessary)
- Performance testing 'framework'
- Inbuilt feedback widget
- Make into reusable component
- Minimise javascript
- Obscure javascript