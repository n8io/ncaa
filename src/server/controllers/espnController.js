const request = require(`request`);
const _ = require(`lodash`);
const espnController = function() {};
const year = process.env.YEAR || (new Date()).getFullYear();
const groupId = process.env.ESPN_GROUP_ID || -1;
const espnBrackUrl = `http://games.espn.go.com/tournament-challenge-bracket/${year.toString()}/en/api/v3/group?sort=-1&start=0&length=200&enable=periodPoints&groupID=${groupId.toString()}`;

espnController.getPoolInfo = getPoolInfo;

module.exports = espnController;

function getPoolInfo(callback) {
  const opts = {};
  const teams = getTeams();

  opts.uri = espnBrackUrl;
  opts.qs = {noc: (new Date()).getTime()};
  opts.json = true;

  request(opts, onRequestResponse);

  function onRequestResponse(err, resp, body) {
    const data = body;

    if (err || resp.statusCode !== 200) {
      return callback(err);
    }

    data.group.entries = data.group.entries.map((e) => {
      e.winningTeam = _.find(teams, {id: e.winningTeamID});

      e.periodPoints = _(e.periodPoints).values().value();

      return e;
    });

    return callback(null, data);
  }
}

function getTeams() {
  const teams = [
    {
      w: false,
      id: 87,
      s: `40`,
      eid: 150,
      h: true
    },
    {
      w: false,
      id: 88,
      s: `43`,
      eid: 350,
      h: false
    },
    {
      w: false,
      id: 115,
      s: `25`,
      eid: 2641,
      h: true
    },
    {
      w: false,
      id: 116,
      s: `26`,
      eid: 2086,
      h: false
    },
    {
      w: false,
      id: 67,
      s: `--`,
      eid: 38,
      h: true
    },
    {
      w: false,
      id: 68,
      s: `--`,
      eid: 41,
      h: false
    },
    {
      w: false,
      id: 119,
      s: `--`,
      eid: 66,
      h: true
    },
    {
      w: false,
      id: 120,
      s: `--`,
      eid: 314,
      h: false
    },
    {
      w: false,
      id: 85,
      s: `--`,
      eid: 239,
      h: true
    },
    {
      w: false,
      id: 86,
      s: `--`,
      eid: 43,
      h: false
    },
    {
      w: false,
      id: 113,
      s: `--`,
      eid: 258,
      h: true
    },
    {
      w: false,
      id: 114,
      s: `--`,
      eid: 2261,
      h: false
    },
    {
      w: false,
      id: 65,
      s: `--`,
      eid: 2305,
      h: true
    },
    {
      w: false,
      id: 66,
      s: `--`,
      eid: 2046,
      h: false
    },
    {
      w: false,
      id: 117,
      s: `--`,
      eid: 2509,
      h: true
    },
    {
      w: false,
      id: 118,
      s: `--`,
      eid: 2031,
      h: false
    },
    {
      w: false,
      id: 75,
      s: `--`,
      eid: 2390,
      h: true
    },
    {
      w: false,
      id: 76,
      s: `--`,
      eid: 2084,
      h: false
    },
    {
      w: false,
      id: 101,
      s: `--`,
      eid: 84,
      h: true
    },
    {
      w: false,
      id: 102,
      s: `--`,
      eid: 236,
      h: false
    },
    {
      w: false,
      id: 97,
      s: `--`,
      eid: 153,
      h: true
    },
    {
      w: false,
      id: 98,
      s: `--`,
      eid: 526,
      h: false
    },
    {
      w: false,
      id: 123,
      s: `--`,
      eid: 254,
      h: true
    },
    {
      w: false,
      id: 124,
      s: `--`,
      eid: 278,
      h: false
    },
    {
      w: false,
      id: 73,
      s: `--`,
      eid: 12,
      h: true
    },
    {
      w: false,
      id: 74,
      s: `--`,
      eid: 2724,
      h: false
    },
    {
      w: false,
      id: 103,
      s: `--`,
      eid: 96,
      h: true
    },
    {
      w: false,
      id: 104,
      s: `--`,
      eid: 2619,
      h: false
    },
    {
      w: false,
      id: 99,
      s: `--`,
      eid: 30,
      h: true
    },
    {
      w: false,
      id: 100,
      s: `--`,
      eid: 2507,
      h: false
    },
    {
      w: false,
      id: 121,
      s: `--`,
      eid: 2550,
      h: true
    },
    {
      w: false,
      id: 122,
      s: `--`,
      eid: 2250,
      h: false
    },
    {
      w: false,
      id: 125,
      s: `--`,
      eid: 2168,
      h: true
    },
    {
      w: false,
      id: 126,
      s: `--`,
      eid: 183,
      h: false
    },
    {
      w: false,
      id: 79,
      s: `--`,
      eid: 222,
      h: true
    },
    {
      w: false,
      id: 80,
      s: `--`,
      eid: 2427,
      h: false
    },
    {
      w: false,
      id: 93,
      s: `--`,
      eid: 204,
      h: true
    },
    {
      w: false,
      id: 94,
      s: `--`,
      eid: 2670,
      h: false
    },
    {
      w: false,
      id: 71,
      s: `--`,
      eid: 25,
      h: true
    },
    {
      w: false,
      id: 72,
      s: `--`,
      eid: 62,
      h: false
    },
    {
      w: false,
      id: 127,
      s: `--`,
      eid: 127,
      h: true
    },
    {
      w: false,
      id: 128,
      s: `--`,
      eid: 2393,
      h: false
    },
    {
      w: false,
      id: 77,
      s: `--`,
      eid: 2294,
      h: true
    },
    {
      w: false,
      id: 78,
      s: `--`,
      eid: 218,
      h: false
    },
    {
      w: false,
      id: 95,
      s: `--`,
      eid: 201,
      h: true
    },
    {
      w: false,
      id: 96,
      s: `--`,
      eid: 2934,
      h: false
    },
    {
      w: false,
      id: 69,
      s: `--`,
      eid: 120,
      h: true
    },
    {
      w: false,
      id: 70,
      s: `--`,
      eid: 2571,
      h: false
    },
    {
      w: false,
      id: 109,
      s: `--`,
      eid: 275,
      h: true
    },
    {
      w: false,
      id: 110,
      s: `--`,
      eid: 221,
      h: false
    },
    {
      w: false,
      id: 107,
      s: `--`,
      eid: 277,
      h: true
    },
    {
      w: false,
      id: 108,
      s: `--`,
      eid: 2617,
      h: false
    },
    {
      w: false,
      id: 91,
      s: `--`,
      eid: 245,
      h: true
    },
    {
      w: false,
      id: 92,
      s: `--`,
      eid: 2739,
      h: false
    },
    {
      w: false,
      id: 81,
      s: `--`,
      eid: 2483,
      h: true
    },
    {
      w: false,
      id: 82,
      s: `--`,
      eid: 107,
      h: false
    },
    {
      w: false,
      id: 111,
      s: `--`,
      eid: 2752,
      h: true
    },
    {
      w: false,
      id: 112,
      s: `--`,
      eid: 2692,
      h: false
    },
    {
      w: false,
      id: 105,
      s: `--`,
      eid: 87,
      h: true
    },
    {
      w: false,
      id: 106,
      s: `--`,
      eid: 130,
      h: false
    },
    {
      w: false,
      id: 89,
      s: `--`,
      eid: 251,
      h: true
    },
    {
      w: false,
      id: 90,
      s: `--`,
      eid: 2460,
      h: false
    },
    {
      w: false,
      id: 83,
      s: `--`,
      eid: 2603,
      h: true
    },
    {
      w: false,
      id: 84,
      s: `--`,
      eid: 2132,
      h: false
    }
  ];

  teams.forEach((t) => {
    t.id = t.id - 64;
    return t;
  });

  return teams;
}
