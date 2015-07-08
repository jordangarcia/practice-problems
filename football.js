var _ = require('underscore')

// I want to track the stats of a football game
// the two teams that are playing
// the score for each team in each quarter
// Redskins: 0 7 14 3
// Giants: 9 10 0 3

// season is a map of weeks => games
/**
var season = {
  'week 1': [game1, game2, game3],
  'week 2': [game4, game5, game6],
}
*/

// write a function that takes a data structure representing a single game
// and returns the team name of the winner

var game1 = {
  "Redskins": [0, 0, 0, 0],
  "Giants": [9, 10, 0, 3]
};
var game2 = {
  "49ers": [14, 7, 14, 14],
  "Ravens": [9, 10, 0, 3]
};
var game3 = {
  "Seahawks": [28, 7, 14, 14],
  "Cowboys": [9, 3, 0, 3]
};

var week1 = [game1, game2, game3];
var week2 = [game1, game2, game3];
var week3 = [game1, game2, game3];

var season = [week1, week2, week3]

var  getWinner = function(game) {
  var max = 0;
  var teamName = null;
 _.each(game, function(scores, gameName) {
   var teamScore = getScore(scores);
   if (max < teamScore) {
     max = teamScore;
     teamName = gameName;
   }
 });
  return teamName;
}

var getScore = function(quarterScores) {
  return _.reduce(quarterScores, function(memo, score){ return memo = memo + score;}, 0);
};

var getWeekStats = function(week) {
  var stats = {
    "winners" : [],
    "losers" : []
  };
  
  _.each(week, function(game) {
    var winner = getWinner(game);
    stats.winners.push(winner);
    stats.losers.push(_.reject(_.keys(game), function(gameName){return gameName ===  winner})[0]);
  });
  return stats;
}

var getSeasonStats = function(season) {
  var seasonStats = {};
  var initTeam = function(name) {
    
    if (!seasonStats[name]){
      seasonStats[name] = {
        wins: 0,
        loses: 0,
      }
    }
  }
  _.each(season, function(week) {
    var stats = getWeekStats(week);
    _.each(stats.winners, function(teamName){
      initTeam(teamName);
      seasonStats[teamName].wins =+ 1;
    });
    _.each(stats.losers, function(teamName){
      initTeam(teamName);
      seasonStats[teamName].loses =+ 1;
    });
  });
  return seasonStats;
}



//console.log(getWinner(game1)) // 'Redskins'
//console.log(getWeekStats(week1))
/**
 * 
 {
   winners: ['Giants', '49ers', 'Seahawks'],
   losers: ['Redskins', 'Ravens', 'Cowboys']
 }
 */


console.log(getSeasonStats(season))
/**
{
  "Reksins": {
    wins: 0,
    losses: 3
  },
  "Giants": {
    wins: 3,
    losses: 0
  },
  ...
}
*/
