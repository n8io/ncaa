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
  // HINT: copy(JSON.stringify(espn.fantasy.maxpart.config.scoreboard_teams, null, 2))
  const teams = [
    {
      "sl": 0,
      "id": 1,
      "e": true,
      "s": 1,
      "r": `31-3`,
      "c": `123d7C`,
      "a": `NOVA`,
      "n": `Villanova`,
      "bpi": `1`,
      "eid": 222,
      "i": 0
    },
    {
      "sl": 1,
      "id": 2,
      "e": true,
      "s": 16,
      "r": `19-15`,
      "c": `f4f142`,
      "a": `MSM`,
      "n": `MSM`,
      "bpi": `207`,
      "eid": 116,
      "i": 1
    },
    {
      "sl": 2,
      "id": 3,
      "e": false,
      "s": 8,
      "r": `25-9`,
      "c": `A00002`,
      "a": `WIS`,
      "n": `Wisconsin`,
      "bpi": `21`,
      "eid": 275,
      "i": 2
    },
    {
      "sl": 3,
      "id": 4,
      "e": true,
      "s": 9,
      "r": `22-10`,
      "c": `74232D`,
      "a": `VT`,
      "n": `Virginia Tech`,
      "bpi": `50`,
      "eid": 259,
      "i": 3
    },
    {
      "sl": 4,
      "id": 5,
      "e": true,
      "s": 5,
      "r": `22-10`,
      "c": `00204E`,
      "a": `UVA`,
      "n": `UVA`,
      "bpi": `4`,
      "eid": 258,
      "i": 4
    },
    {
      "sl": 5,
      "id": 6,
      "e": true,
      "s": 12,
      "r": `29-5`,
      "c": `1d2f68`,
      "a": `UNCW`,
      "n": `UNC Wilmington`,
      "bpi": `61`,
      "eid": 350,
      "i": 5
    },
    {
      "sl": 6,
      "id": 7,
      "e": false,
      "s": 4,
      "r": `24-8`,
      "c": `0021A5`,
      "a": `FLA`,
      "n": `Florida`,
      "bpi": `8`,
      "eid": 57,
      "i": 6
    },
    {
      "sl": 7,
      "id": 8,
      "e": true,
      "s": 13,
      "r": `27-7`,
      "c": `002d61`,
      "a": `ETSU`,
      "n": `ETSU`,
      "bpi": `74`,
      "eid": 2193,
      "i": 7
    },
    {
      "sl": 8,
      "id": 9,
      "e": true,
      "s": 6,
      "r": `30-4`,
      "c": `E32F38`,
      "a": `SMU`,
      "n": `SMU`,
      "bpi": `16`,
      "eid": 2567,
      "i": 8
    },
    {
      "sl": 9,
      "id": 10,
      "e": true,
      "s": 11,
      "r": `24-9`,
      "c": `F36E21`,
      "a": `USC`,
      "n": `USC`,
      "bpi": `59`,
      "eid": 30,
      "i": 9
    },
    {
      "sl": 10,
      "id": 11,
      "e": false,
      "s": 3,
      "r": `25-7`,
      "c": `004834`,
      "a": `BAY`,
      "n": `Baylor`,
      "bpi": `17`,
      "eid": 239,
      "i": 10
    },
    {
      "sl": 11,
      "id": 12,
      "e": true,
      "s": 14,
      "r": `28-5`,
      "c": `891216`,
      "a": `NMSU`,
      "n": `New Mexico St`,
      "bpi": `98`,
      "eid": 166,
      "i": 11
    },
    {
      "sl": 12,
      "id": 13,
      "e": false,
      "s": 7,
      "r": `22-10`,
      "c": `670010`,
      "a": `SC`,
      "n": `South Carolina`,
      "bpi": `43`,
      "eid": 2579,
      "i": 12
    },
    {
      "sl": 13,
      "id": 14,
      "e": true,
      "s": 10,
      "r": `19-12`,
      "c": `083963`,
      "a": `MARQ`,
      "n": `Marquette`,
      "bpi": `29`,
      "eid": 269,
      "i": 13
    },
    {
      "sl": 14,
      "id": 15,
      "e": true,
      "s": 2,
      "r": `27-8`,
      "c": `001A57`,
      "a": `DUKE`,
      "n": `Duke`,
      "bpi": `6`,
      "eid": 150,
      "i": 14
    },
    {
      "sl": 15,
      "id": 16,
      "e": true,
      "s": 15,
      "r": `22-14`,
      "c": `AE0210`,
      "a": `TROY`,
      "n": `Troy`,
      "bpi": `127`,
      "eid": 2653,
      "i": 15
    },
    {
      "sl": 16,
      "id": 17,
      "e": false,
      "s": 1,
      "r": `32-1`,
      "c": `002967`,
      "a": `GONZ`,
      "n": `Gonzaga`,
      "bpi": `2`,
      "eid": 2250,
      "i": 16
    },
    {
      "sl": 17,
      "id": 18,
      "e": true,
      "s": 16,
      "r": `18-16`,
      "c": `005DAB`,
      "a": `SDST`,
      "n": `South Dakota St`,
      "bpi": `188`,
      "eid": 2571,
      "i": 17
    },
    {
      "sl": 18,
      "id": 19,
      "e": true,
      "s": 8,
      "r": `23-11`,
      "c": `372286`,
      "a": `NW`,
      "n": `Northwestern`,
      "bpi": `46`,
      "eid": 77,
      "i": 18
    },
    {
      "sl": 19,
      "id": 20,
      "e": true,
      "s": 9,
      "r": `19-15`,
      "c": `000000`,
      "a": `VAN`,
      "n": `Vanderbilt`,
      "bpi": `39`,
      "eid": 238,
      "i": 19
    },
    {
      "sl": 20,
      "id": 21,
      "e": true,
      "s": 5,
      "r": `25-9`,
      "c": `00122b`,
      "a": `ND`,
      "n": `Notre Dame`,
      "bpi": `22`,
      "eid": 87,
      "i": 20
    },
    {
      "sl": 21,
      "id": 22,
      "e": true,
      "s": 12,
      "r": `23-6`,
      "c": `ff9408`,
      "a": `PRIN`,
      "n": `Princeton`,
      "bpi": `54`,
      "eid": 163,
      "i": 21
    },
    {
      "sl": 22,
      "id": 23,
      "e": false,
      "s": 4,
      "r": `26-8`,
      "c": `FFC600`,
      "a": `WVU`,
      "n": `West Virginia`,
      "bpi": `7`,
      "eid": 277,
      "i": 22
    },
    {
      "sl": 23,
      "id": 24,
      "e": true,
      "s": 13,
      "r": `26-8`,
      "c": `000060`,
      "a": `BUCK`,
      "n": `Bucknell`,
      "bpi": `85`,
      "eid": 2083,
      "i": 23
    },
    {
      "sl": 24,
      "id": 25,
      "e": true,
      "s": 6,
      "r": `24-8`,
      "c": `D5002B`,
      "a": `MD`,
      "n": `Maryland`,
      "bpi": `49`,
      "eid": 120,
      "i": 24
    },
    {
      "sl": 25,
      "id": 26,
      "e": false,
      "s": 11,
      "r": `21-13`,
      "c": `002144`,
      "a": `XAV`,
      "n": `Xavier`,
      "bpi": `35`,
      "eid": 2752,
      "i": 25
    },
    {
      "sl": 26,
      "id": 27,
      "e": true,
      "s": 3,
      "r": `25-8`,
      "c": `782F40`,
      "a": `FSU`,
      "n": `FSU`,
      "bpi": `20`,
      "eid": 52,
      "i": 26
    },
    {
      "sl": 27,
      "id": 28,
      "e": true,
      "s": 14,
      "r": `26-7`,
      "c": `00885a`,
      "a": `FGCU`,
      "n": `FGCU`,
      "bpi": `80`,
      "eid": 526,
      "i": 27
    },
    {
      "sl": 28,
      "id": 29,
      "e": true,
      "s": 7,
      "r": `28-4`,
      "c": `003768`,
      "a": `SMC`,
      "n": `Saint Mary's`,
      "bpi": `12`,
      "eid": 2608,
      "i": 28
    },
    {
      "sl": 29,
      "id": 30,
      "e": true,
      "s": 10,
      "r": `26-8`,
      "c": `929292`,
      "a": `VCU`,
      "n": `VCU`,
      "bpi": `40`,
      "eid": 2670,
      "i": 29
    },
    {
      "sl": 30,
      "id": 31,
      "e": false,
      "s": 2,
      "r": `30-4`,
      "c": `002449`,
      "a": `ARIZ`,
      "n": `Arizona`,
      "bpi": `24`,
      "eid": 12,
      "i": 30
    },
    {
      "sl": 31,
      "id": 32,
      "e": true,
      "s": 15,
      "r": `22-9`,
      "c": `00A26B`,
      "a": `UND`,
      "n": `North Dakota`,
      "bpi": `146`,
      "eid": 155,
      "i": 31
    },
    {
      "sl": 32,
      "id": 33,
      "e": false,
      "s": 1,
      "r": `28-4`,
      "c": `0022B4`,
      "a": `KU`,
      "n": `Kansas`,
      "bpi": `10`,
      "eid": 2305,
      "i": 32
    },
    {
      "sl": 33,
      "id": 34,
      "e": true,
      "s": 16,
      "r": `22-12`,
      "c": `bb0000`,
      "a": `UCD`,
      "n": `UC Davis`,
      "bpi": `210`,
      "eid": 302,
      "i": 33
    },
    {
      "sl": 34,
      "id": 35,
      "e": true,
      "s": 8,
      "r": `21-11`,
      "c": `004325`,
      "a": `MIA`,
      "n": `Miami`,
      "bpi": `28`,
      "eid": 2390,
      "i": 34
    },
    {
      "sl": 35,
      "id": 36,
      "e": true,
      "s": 9,
      "r": `19-14`,
      "c": `18453B`,
      "a": `MSU`,
      "n": `Michigan State`,
      "bpi": `44`,
      "eid": 127,
      "i": 35
    },
    {
      "sl": 36,
      "id": 37,
      "e": true,
      "s": 5,
      "r": `23-10`,
      "c": `660015`,
      "a": `ISU`,
      "n": `Iowa State`,
      "bpi": `23`,
      "eid": 66,
      "i": 36
    },
    {
      "sl": 37,
      "id": 38,
      "e": true,
      "s": 12,
      "r": `28-6`,
      "c": `153E5F`,
      "a": `NEV`,
      "n": `Nevada`,
      "bpi": `48`,
      "eid": 2440,
      "i": 37
    },
    {
      "sl": 38,
      "id": 39,
      "e": false,
      "s": 4,
      "r": `25-7`,
      "c": `B89D29`,
      "a": `PUR`,
      "n": `Purdue`,
      "bpi": `11`,
      "eid": 2509,
      "i": 38
    },
    {
      "sl": 39,
      "id": 40,
      "e": true,
      "s": 13,
      "r": `29-5`,
      "c": `013C24`,
      "a": `UVM`,
      "n": `Vermont`,
      "bpi": `51`,
      "eid": 261,
      "i": 39
    },
    {
      "sl": 40,
      "id": 41,
      "e": true,
      "s": 6,
      "r": `25-9`,
      "c": `13299e`,
      "a": `CREI`,
      "n": `Creighton`,
      "bpi": `27`,
      "eid": 156,
      "i": 40
    },
    {
      "sl": 41,
      "id": 42,
      "e": true,
      "s": 11,
      "r": `24-9`,
      "c": `3691C6`,
      "a": `URI`,
      "n": `URI`,
      "bpi": `33`,
      "eid": 227,
      "i": 41
    },
    {
      "sl": 42,
      "id": 43,
      "e": false,
      "s": 3,
      "r": `29-5`,
      "c": `044520`,
      "a": `ORE`,
      "n": `Oregon`,
      "bpi": `13`,
      "eid": 2483,
      "i": 42
    },
    {
      "sl": 43,
      "id": 44,
      "e": true,
      "s": 14,
      "r": `22-12`,
      "c": `8c001a`,
      "a": `IONA`,
      "n": `Iona`,
      "bpi": `137`,
      "eid": 314,
      "i": 43
    },
    {
      "sl": 44,
      "id": 45,
      "e": false,
      "s": 7,
      "r": `24-11`,
      "c": `00274c`,
      "a": `MICH`,
      "n": `Michigan`,
      "bpi": `18`,
      "eid": 130,
      "i": 44
    },
    {
      "sl": 45,
      "id": 46,
      "e": true,
      "s": 10,
      "r": `20-12`,
      "c": `FF6500`,
      "a": `OKST`,
      "n": `Oklahoma State`,
      "bpi": `26`,
      "eid": 197,
      "i": 45
    },
    {
      "sl": 46,
      "id": 47,
      "e": true,
      "s": 2,
      "r": `24-8`,
      "c": `ad000a`,
      "a": `LOU`,
      "n": `Louisville`,
      "bpi": `5`,
      "eid": 97,
      "i": 46
    },
    {
      "sl": 47,
      "id": 48,
      "e": true,
      "s": 15,
      "r": `20-14`,
      "c": `b50500`,
      "a": `JVST`,
      "n": `Jacksonville St`,
      "bpi": `174`,
      "eid": 55,
      "i": 47
    },
    {
      "sl": 48,
      "id": 49,
      "e": false,
      "s": 1,
      "r": `27-7`,
      "c": `99bfe5`,
      "a": `UNC`,
      "n": `UNC`,
      "bpi": `3`,
      "eid": 153,
      "i": 48
    },
    {
      "sl": 49,
      "id": 50,
      "e": true,
      "s": 16,
      "r": `23-11`,
      "c": `6A0403`,
      "a": `TXSO`,
      "n": `Texas Southern`,
      "bpi": `178`,
      "eid": 2640,
      "i": 49
    },
    {
      "sl": 50,
      "id": 51,
      "e": true,
      "s": 8,
      "r": `25-9`,
      "c": `9c1831`,
      "a": `ARK`,
      "n": `Arkansas`,
      "bpi": `47`,
      "eid": 8,
      "i": 50
    },
    {
      "sl": 51,
      "id": 52,
      "e": true,
      "s": 9,
      "r": `21-11`,
      "c": `0857B1`,
      "a": `HALL`,
      "n": `Seton Hall`,
      "bpi": `53`,
      "eid": 2550,
      "i": 51
    },
    {
      "sl": 52,
      "id": 53,
      "e": true,
      "s": 5,
      "r": `24-9`,
      "c": `7F011B`,
      "a": `MINN`,
      "n": `Minnesota`,
      "bpi": `38`,
      "eid": 135,
      "i": 52
    },
    {
      "sl": 53,
      "id": 54,
      "e": true,
      "s": 12,
      "r": `30-4`,
      "c": `0079C2`,
      "a": `MTSU`,
      "n": `Mid Tennessee`,
      "bpi": `45`,
      "eid": 2393,
      "i": 53
    },
    {
      "sl": 54,
      "id": 55,
      "e": false,
      "s": 4,
      "r": `23-8`,
      "c": `0d1361`,
      "a": `BUT`,
      "n": `Butler`,
      "bpi": `25`,
      "eid": 2086,
      "i": 54
    },
    {
      "sl": 55,
      "id": 56,
      "e": true,
      "s": 13,
      "r": `26-6`,
      "c": `9e0b0e`,
      "a": `WIN`,
      "n": `Winthrop`,
      "bpi": `101`,
      "eid": 2737,
      "i": 55
    },
    {
      "sl": 56,
      "id": 57,
      "e": true,
      "s": 6,
      "r": `29-5`,
      "c": `000000`,
      "a": `CIN`,
      "n": `Cincinnati`,
      "bpi": `19`,
      "eid": 2132,
      "i": 56
    },
    {
      "sl": 57,
      "id": 58,
      "e": true,
      "s": 11,
      "r": `20-13`,
      "c": `588fe8`,
      "a": `KSU`,
      "n": `KSU`,
      "bpi": `37`,
      "eid": 2306,
      "i": 57
    },
    {
      "sl": 58,
      "id": 59,
      "e": false,
      "s": 3,
      "r": `29-4`,
      "c": `005C8E`,
      "a": `UCLA`,
      "n": `UCLA`,
      "bpi": `14`,
      "eid": 26,
      "i": 58
    },
    {
      "sl": 59,
      "id": 60,
      "e": true,
      "s": 14,
      "r": `22-13`,
      "c": `002445`,
      "a": `KENT`,
      "n": `Kent State`,
      "bpi": `139`,
      "eid": 2309,
      "i": 59
    },
    {
      "sl": 60,
      "id": 61,
      "e": true,
      "s": 7,
      "r": `24-7`,
      "c": `004B8D`,
      "a": `DAY`,
      "n": `Dayton`,
      "bpi": `36`,
      "eid": 2168,
      "i": 60
    },
    {
      "sl": 61,
      "id": 62,
      "e": true,
      "s": 10,
      "r": `30-4`,
      "c": `0d0a03`,
      "a": `WICH`,
      "n": `Wichita State`,
      "bpi": `15`,
      "eid": 2724,
      "i": 61
    },
    {
      "sl": 62,
      "id": 63,
      "e": false,
      "s": 2,
      "r": `29-5`,
      "c": `005DAA`,
      "a": `UK`,
      "n": `Kentucky`,
      "bpi": `9`,
      "eid": 96,
      "i": 62
    },
    {
      "sl": 63,
      "id": 64,
      "e": true,
      "s": 15,
      "r": `24-10`,
      "c": `000000`,
      "a": `NKU`,
      "n": `N Kentucky`,
      "bpi": `177`,
      "eid": 94,
      "i": 63
    }
  ];

  teams.forEach((t) => {
    t.isEliminated = t.e;
    return t;
  });

  return teams;
}
