const router = require('express').Router();
const jsonparser = require('body-parser').json();
const riot = require('lol-riot-api-module');
var championList;

const riotAPI = new riot({
  key: require('./config/api-key.js'),
  region: 'na'
});

router.get('/test', (req, res) => { res.send('success'); });

router.get('/lookup/:name/:region', jsonparser, lookupByName);
router.get('/version', getRealmVersion);
router.get('/champions', getChampionIds);

getChampionIds();

module.exports = router;

function getChampionIds() {
  riotAPI.getChampionData({dataById:true}).then(function(data) {
    var champions = [];
    var list = data.data;
    for (var champion in list) {
      var champ = {};
      champ.id = list[champion].id;
      champ.key = list[champion].key;
      champions.push(champ);
    }
    championList = champions;
  });
}

function getRealmVersion(req, res) {
  var currentVersion;
  riotAPI.getVersions().then(function(data) {
    currentVersion = data[0];
    res.send(currentVersion);
  })
};

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
      for (game in data.games) {
        item = data.games[game];
        kills = item.stats.championsKilled || 0;
        assists = item.stats.assists || 0;
        deaths = item.stats.numDeaths || 0;
        championId = item.championId;
        games.push({
          kills: kills,
          assists: assists,
          deaths: deaths,
          feeding: kills + assists < deaths,
          championId: championId 
        });
      }
      for (var i = 0; i < games.length; i++) {
        for (var j = 0; j < championList.length; j++) {
          if (games[i].championId === championList[j].id) {
            games[i].key = championList[j].key;
          }
        }
      }
      response.games = games;
    }).then(function() {
      res.send(response);
    });
  });
}