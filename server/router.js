const router = require('express').Router();
const jsonparser = require('body-parser').json();
const riot = require('lol-riot-api-module');

const riotAPI = new riot({
  key: require('./config/api-key.js'),
  region: 'na'
});

router.get('/test', (req, res) => { res.send('success'); });

router.get('/lookup/:name/:region', jsonparser, lookupByName);

module.exports = router;

function lookupByName(req, res) {
  const name = req.params.name;
  const region = req.params.region;
  var response = {};
  riotAPI.getSummonersByNames({names:name}).then(function(data) {
    response.name = data[name].name;
    response.icon = data[name].profileIconId;
    const summoner = { id: data[name].id, region: region };
    riotAPI.getRecentGamesBySummonerId(summoner).then(function(data) {
      var games = [];
      var item, kills, assists, deaths, championId;
      for(game in data.games) {
        item = data.games[game];
        kills = item.stats.championsKilled;
        assists = item.stats.assists;
        deaths = item.stats.numDeaths || 0;
        championId = item.championId;
        games.push({
          kills: kills,
          assists: assists,
          deaths: deaths,
          feeding: kills + assists >= deaths,
          championId: championId 
        });
      }
      response.games = games;
    }).then(function() {
      res.send(response);
    });
  });
}