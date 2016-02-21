var espnController = function() {};
var year = process.env.YEAR || (new Date()).getFullyear();
var groupId = process.env.ESPN_GROUP_ID || -1;
var espnBrackUrl = 'http://games.espn.go.com/tournament-challenge-bracket'
  + '/' + year.toString() + '/en/api/v3/group?sort=-1&start=0&length=200&enable=periodPoints&groupID=' + groupId.toString();

espnController.getBracketInfo = getBracketInfo;

module.exports = espnController;

function getBracketInfo(req, res, next) {
  var opts = {}

  opts.uri = espnBrackUrl;
  opts.qs = {noc: (new Date()).getTime()};
  opts.json = true;

  request(opts, onRequestResponse);

  function onRequestResponse(err, resp, body) {
    if(err || resp.statusCode !== 200) {
      return next(err || new Error('Returned bad response. ' + resp.statusCode));
    }

    var data = body;
    data.group.entries = _.map(data.group.entries, function(e) {
      e.winningTeam = _.find(teams, {id: e.winningTeamID});

      return e;
    });

    return res.json(data);
  }
}

var teams = [
  {
    id: 1,
    s: 1,
    isEliminated: false,
    a: 'UK',
    n: 'Kentucky',
    eid: 96
  },
  {
    id: 2,
    s: 16,
    isEliminated: true,
    a: 'HAMP',
    n: 'Hampton',
    eid: 2261
  },
  {
    id: 3,
    s: 8,
    isEliminated: true,
    a: 'CIN',
    n: 'Cincinnati',
    eid: 2132
  },
  {
    id: 4,
    s: 9,
    isEliminated: true,
    a: 'PUR',
    n: 'Purdue',
    eid: 2509
  },
  {
    id: 5,
    s: 5,
    isEliminated: false,
    a: 'WVU',
    n: 'West Virginia',
    eid: 277
  },
  {
    id: 6,
    s: 12,
    isEliminated: true,
    a: 'BUFF',
    n: 'Buffalo',
    eid: 2084
  },
  {
    id: 7,
    s: 4,
    isEliminated: false,
    a: 'MD',
    n: 'Maryland',
    eid: 120
  },
  {
    id: 8,
    s: 13,
    isEliminated: true,
    a: 'VALP',
    n: 'Valparaiso',
    eid: 2674
  },
  {
    id: 9,
    s: 6,
    isEliminated: true,
    a: 'BUT',
    n: 'Butler',
    eid: 2086
  },
  {
    id: 10,
    s: 11,
    isEliminated: true,
    a: 'TEX',
    n: 'Texas',
    eid: 251
  },
  {
    id: 11,
    s: 3,
    isEliminated: false,
    a: 'ND',
    n: 'Notre Dame',
    eid: 87
  },
  {
    id: 12,
    s: 14,
    isEliminated: true,
    a: 'NE',
    n: 'Northeastern',
    eid: 111
  },
  {
    id: 13,
    s: 7,
    isEliminated: false,
    a: 'WICH',
    n: 'Wichita St',
    eid: 2724
  },
  {
    id: 14,
    s: 10,
    isEliminated: true,
    a: 'IND',
    n: 'Indiana',
    eid: 84
  },
  {
    id: 15,
    s: 2,
    isEliminated: false,
    a: 'KU',
    n: 'Kansas',
    eid: 2305
  },
  {
    id: 16,
    s: 15,
    isEliminated: true,
    a: 'NMSU',
    n: 'NM State',
    eid: 166
  },
  {
    id: 17,
    s: 1,
    isEliminated: false,
    a: 'WIS',
    n: 'Wisconsin',
    eid: 275
  },
  {
    id: 18,
    s: 16,
    isEliminated: true,
    a: 'CCAR',
    n: 'Coastal Car',
    eid: 324
  },
  {
    id: 19,
    s: 8,
    isEliminated: false,
    a: 'ORE',
    n: 'Oregon',
    eid: 2483
  },
  {
    id: 20,
    s: 9,
    isEliminated: true,
    a: 'OKST',
    n: 'Oklahoma St',
    eid: 197
  },
  {
    id: 21,
    s: 5,
    isEliminated: true,
    a: 'ARK',
    n: 'Arkansas',
    eid: 8
  },
  {
    id: 22,
    s: 12,
    isEliminated: true,
    a: 'WOF',
    n: 'Wofford',
    eid: 2747
  },
  {
    id: 23,
    s: 4,
    isEliminated: false,
    a: 'UNC',
    n: 'UNC',
    eid: 153
  },
  {
    id: 24,
    s: 13,
    isEliminated: true,
    a: 'HARV',
    n: 'Harvard',
    eid: 108
  },
  {
    id: 25,
    s: 6,
    isEliminated: false,
    a: 'XAV',
    n: 'Xavier',
    eid: 2752
  },
  {
    id: 26,
    s: 11,
    isEliminated: true,
    a: 'MISS',
    n: 'Ole Miss',
    eid: 145
  },
  {
    id: 27,
    s: 3,
    isEliminated: true,
    a: 'BAY',
    n: 'Baylor',
    eid: 239
  },
  {
    id: 28,
    s: 14,
    isEliminated: true,
    a: 'GAST',
    n: 'Georgia St',
    eid: 2247
  },
  {
    id: 29,
    s: 7,
    isEliminated: true,
    a: 'VCU',
    n: 'VCU',
    eid: 2670
  },
  {
    id: 30,
    s: 10,
    isEliminated: true,
    a: 'OSU',
    n: 'Ohio State',
    eid: 194
  },
  {
    id: 31,
    s: 2,
    isEliminated: false,
    a: 'ARIZ',
    n: 'Arizona',
    eid: 12
  },
  {
    id: 32,
    s: 15,
    isEliminated: true,
    a: 'TXSO',
    n: 'Texas So',
    eid: 2640
  },
  {
    id: 33,
    s: 1,
    isEliminated: true,
    a: 'VILL',
    n: 'Villanova',
    eid: 222
  },
  {
    id: 34,
    s: 16,
    isEliminated: true,
    a: 'LAF',
    n: 'Lafayette',
    eid: 322
  },
  {
    id: 35,
    s: 8,
    isEliminated: false,
    a: 'NCST',
    n: 'NC State',
    eid: 152
  },
  {
    id: 36,
    s: 9,
    isEliminated: true,
    a: 'LSU',
    n: 'LSU',
    eid: 99
  },
  {
    id: 37,
    s: 5,
    isEliminated: false,
    a: 'UNI',
    n: 'N Iowa',
    eid: 2460
  },
  {
    id: 38,
    s: 12,
    isEliminated: true,
    a: 'WYO',
    n: 'Wyoming',
    eid: 2751
  },
  {
    id: 39,
    s: 4,
    isEliminated: false,
    a: 'LOU',
    n: 'Louisville',
    eid: 97
  },
  {
    id: 40,
    s: 13,
    isEliminated: true,
    a: 'UCI',
    n: 'UC Irvine',
    eid: 300
  },
  {
    id: 41,
    s: 6,
    isEliminated: true,
    a: 'PROV',
    n: 'Providence',
    eid: 2507
  },
  {
    id: 42,
    s: 11,
    isEliminated: false,
    a: 'DAY',
    n: 'Dayton',
    eid: 2168
  },
  {
    id: 43,
    s: 3,
    isEliminated: false,
    a: 'OKLA',
    n: 'Oklahoma',
    eid: 201
  },
  {
    id: 44,
    s: 14,
    isEliminated: true,
    a: 'ALB',
    n: 'Albany',
    eid: 399
  },
  {
    id: 45,
    s: 7,
    isEliminated: false,
    a: 'MSU',
    n: 'Michigan St',
    eid: 127
  },
  {
    id: 46,
    s: 10,
    isEliminated: true,
    a: 'UGA',
    n: 'Georgia',
    eid: 61
  },
  {
    id: 47,
    s: 2,
    isEliminated: false,
    a: 'UVA',
    n: 'Virginia',
    eid: 258
  },
  {
    id: 48,
    s: 15,
    isEliminated: true,
    a: 'BEL',
    n: 'Belmont',
    eid: 2057
  },
  {
    id: 49,
    s: 1,
    isEliminated: false,
    a: 'DUKE',
    n: 'Duke',
    eid: 150
  },
  {
    id: 50,
    s: 16,
    isEliminated: true,
    a: 'RMU',
    n: 'R. Morris',
    eid: 2523
  },
  {
    id: 51,
    s: 8,
    isEliminated: false,
    a: 'SDSU',
    n: 'San Diego St',
    eid: 21
  },
  {
    id: 52,
    s: 9,
    isEliminated: true,
    a: 'SJU',
    n: 'St. John\'s',
    eid: 2599
  },
  {
    id: 53,
    s: 5,
    isEliminated: false,
    a: 'UTAH',
    n: 'Utah',
    eid: 254
  },
  {
    id: 54,
    s: 12,
    isEliminated: true,
    a: 'SFA',
    n: 'SF Austin',
    eid: 2617
  },
  {
    id: 55,
    s: 4,
    isEliminated: true,
    a: 'GTWN',
    n: 'Georgetown',
    eid: 46
  },
  {
    id: 56,
    s: 13,
    isEliminated: true,
    a: 'EWU',
    n: 'E Washington',
    eid: 331
  },
  {
    id: 57,
    s: 6,
    isEliminated: true,
    a: 'SMU',
    n: 'SMU',
    eid: 2567
  },
  {
    id: 58,
    s: 11,
    isEliminated: false,
    a: 'UCLA',
    n: 'UCLA',
    eid: 26
  },
  {
    id: 59,
    s: 3,
    isEliminated: true,
    a: 'ISU',
    n: 'Iowa State',
    eid: 66
  },
  {
    id: 60,
    s: 14,
    isEliminated: true,
    a: 'UAB',
    n: 'UAB',
    eid: 5
  },
  {
    id: 61,
    s: 7,
    isEliminated: false,
    a: 'IOWA',
    n: 'Iowa',
    eid: 2294
  },
  {
    id: 62,
    s: 10,
    isEliminated: true,
    a: 'DAV',
    n: 'Davidson',
    eid: 2166
  },
  {
    id: 63,
    s: 2,
    isEliminated: false,
    a: 'GONZ',
    n: 'Gonzaga',
    eid: 2250
  },
  {
    id: 64,
    s: 15,
    isEliminated: true,
    a: 'NDSU',
    n: 'ND State',
    eid: 2449
  }
];
