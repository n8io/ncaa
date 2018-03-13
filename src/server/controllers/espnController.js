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
      "eid": 258,
      "a": `UVA`,
      "r": `31-2`,
      "s": 1,
      "c": `00204E`,
      "e": false,
      "sl": 0,
      "bpi": `2`,
      "id": 1,
      "n": `UVA`,
      "i": 0
    },
    {
      "eid": 2378,
      "a": `UMBC`,
      "r": `24-10`,
      "s": 16,
      "c": `000000`,
      "e": false,
      "sl": 1,
      "bpi": `172`,
      "id": 2,
      "n": `UMBC`,
      "i": 1
    },
    {
      "eid": 156,
      "a": `CREI`,
      "r": `21-11`,
      "s": 8,
      "c": `13299e`,
      "e": false,
      "sl": 2,
      "bpi": `22`,
      "id": 3,
      "n": `Creighton`,
      "i": 2
    },
    {
      "eid": 2306,
      "a": `KSU`,
      "r": `22-11`,
      "s": 9,
      "c": `633194`,
      "e": false,
      "sl": 3,
      "bpi": `44`,
      "id": 4,
      "n": `Kansas State`,
      "i": 3
    },
    {
      "eid": 96,
      "a": `UK`,
      "r": `24-10`,
      "s": 5,
      "c": `005DAA`,
      "e": false,
      "sl": 4,
      "bpi": `23`,
      "id": 5,
      "n": `Kentucky`,
      "i": 4
    },
    {
      "eid": 2166,
      "a": `DAV`,
      "r": `21-11`,
      "s": 12,
      "c": `000000`,
      "e": false,
      "sl": 5,
      "bpi": `34`,
      "id": 6,
      "n": `Davidson`,
      "i": 5
    },
    {
      "eid": 12,
      "a": `ARIZ`,
      "r": `27-7`,
      "s": 4,
      "c": `002449`,
      "e": false,
      "sl": 6,
      "bpi": `20`,
      "id": 7,
      "n": `Arizona`,
      "i": 6
    },
    {
      "eid": 2084,
      "a": `BUFF`,
      "r": `26-8`,
      "s": 13,
      "c": `041A9B`,
      "e": false,
      "sl": 7,
      "bpi": `81`,
      "id": 8,
      "n": `Buffalo`,
      "i": 7
    },
    {
      "eid": 2390,
      "a": `MIA`,
      "r": `22-9`,
      "s": 6,
      "c": `004325`,
      "e": false,
      "sl": 8,
      "bpi": `35`,
      "id": 9,
      "n": `Miami`,
      "i": 8
    },
    {
      "eid": 2350,
      "a": `L-IL`,
      "r": `28-5`,
      "s": 11,
      "c": `9d1244`,
      "e": false,
      "sl": 9,
      "bpi": `51`,
      "id": 10,
      "n": `Loyola-Chicago`,
      "i": 9
    },
    {
      "eid": 2633,
      "a": `TENN`,
      "r": `25-8`,
      "s": 3,
      "c": `EE9627`,
      "e": false,
      "sl": 10,
      "bpi": `15`,
      "id": 11,
      "n": `Tennessee`,
      "i": 10
    },
    {
      "eid": 2750,
      "a": `WRST`,
      "r": `25-9`,
      "s": 14,
      "c": `E9AF10`,
      "e": false,
      "sl": 11,
      "bpi": `134`,
      "id": 12,
      "n": `Wright State`,
      "i": 11
    },
    {
      "eid": 2440,
      "a": `NEV`,
      "r": `27-7`,
      "s": 7,
      "c": `153E5F`,
      "e": false,
      "sl": 12,
      "bpi": `32`,
      "id": 13,
      "n": `Nevada`,
      "i": 12
    },
    {
      "eid": 251,
      "a": `TEX`,
      "r": `19-14`,
      "s": 10,
      "c": `EE7524`,
      "e": false,
      "sl": 13,
      "bpi": `40`,
      "id": 14,
      "n": `Texas`,
      "i": 13
    },
    {
      "eid": 2132,
      "a": `CIN`,
      "r": `30-4`,
      "s": 2,
      "c": `000000`,
      "e": false,
      "sl": 14,
      "bpi": `5`,
      "id": 15,
      "n": `Cincinnati`,
      "i": 14
    },
    {
      "eid": 2247,
      "a": `GAST`,
      "r": `24-10`,
      "s": 15,
      "c": `1e539a`,
      "e": false,
      "sl": 15,
      "bpi": `99`,
      "id": 16,
      "n": `Georgia State`,
      "i": 15
    },
    {
      "eid": 2752,
      "a": `XAV`,
      "r": `28-5`,
      "s": 1,
      "c": `002967`,
      "e": false,
      "sl": 16,
      "bpi": `12`,
      "id": 17,
      "n": `Xavier`,
      "i": 16
    },
    {
      "eid": -1,
      "a": `NCC/TS`,
      "r": ``,
      "s": 16,
      "c": `005DAB`,
      "e": false,
      "sl": 17,
      "bpi": ``,
      "id": 18,
      "n": `NCC/TS`,
      "i": 17
    },
    {
      "eid": 142,
      "a": `MIZ`,
      "r": `20-12`,
      "s": 8,
      "c": `000000`,
      "e": false,
      "sl": 18,
      "bpi": `47`,
      "id": 19,
      "n": `Missouri`,
      "i": 18
    },
    {
      "eid": 52,
      "a": `FSU`,
      "r": `20-11`,
      "s": 9,
      "c": `782F40`,
      "e": false,
      "sl": 19,
      "bpi": `39`,
      "id": 20,
      "n": `Florida State`,
      "i": 19
    },
    {
      "eid": 194,
      "a": `OSU`,
      "r": `24-8`,
      "s": 5,
      "c": `00122b`,
      "e": false,
      "sl": 20,
      "bpi": `16`,
      "id": 21,
      "n": `OSU`,
      "i": 20
    },
    {
      "eid": 2571,
      "a": `SDST`,
      "r": `28-6`,
      "s": 12,
      "c": `ff9408`,
      "e": false,
      "sl": 21,
      "bpi": `87`,
      "id": 22,
      "n": `South Dakota State`,
      "i": 21
    },
    {
      "eid": 2250,
      "a": `GONZ`,
      "r": `30-4`,
      "s": 4,
      "c": `002967`,
      "e": false,
      "sl": 22,
      "bpi": `9`,
      "id": 23,
      "n": `Gonzaga`,
      "i": 22
    },
    {
      "eid": 2430,
      "a": `UNCG`,
      "r": `27-7`,
      "s": 13,
      "c": `003559`,
      "e": false,
      "sl": 23,
      "bpi": `85`,
      "id": 24,
      "n": `UNCG`,
      "i": 23
    },
    {
      "eid": 248,
      "a": `HOU`,
      "r": `26-7`,
      "s": 6,
      "c": `C90822`,
      "e": false,
      "sl": 24,
      "bpi": `17`,
      "id": 25,
      "n": `Houston`,
      "i": 24
    },
    {
      "eid": 21,
      "a": `SDSU`,
      "r": `22-10`,
      "s": 11,
      "c": `BF2C37`,
      "e": false,
      "sl": 25,
      "bpi": `50`,
      "id": 26,
      "n": `San Diego State`,
      "i": 25
    },
    {
      "eid": 130,
      "a": `MICH`,
      "r": `28-7`,
      "s": 3,
      "c": `00274c`,
      "e": false,
      "sl": 26,
      "bpi": `14`,
      "id": 27,
      "n": `Michigan`,
      "i": 26
    },
    {
      "eid": 149,
      "a": `MONT`,
      "r": `26-7`,
      "s": 14,
      "c": `751D4A`,
      "e": false,
      "sl": 27,
      "bpi": `105`,
      "id": 28,
      "n": `Montana`,
      "i": 27
    },
    {
      "eid": 245,
      "a": `TAMU`,
      "r": `20-12`,
      "s": 7,
      "c": `5C0025`,
      "e": false,
      "sl": 28,
      "bpi": `37`,
      "id": 29,
      "n": `Texas A&M`,
      "i": 28
    },
    {
      "eid": 2507,
      "a": `PROV`,
      "r": `21-13`,
      "s": 10,
      "c": `000000`,
      "e": false,
      "sl": 29,
      "bpi": `66`,
      "id": 30,
      "n": `Providence`,
      "i": 29
    },
    {
      "eid": 153,
      "a": `UNC`,
      "r": `25-10`,
      "s": 2,
      "c": `99bfe5`,
      "e": false,
      "sl": 30,
      "bpi": `7`,
      "id": 31,
      "n": `UNC`,
      "i": 30
    },
    {
      "eid": 288,
      "a": `LIP`,
      "r": `23-9`,
      "s": 15,
      "c": `20366C`,
      "e": false,
      "sl": 31,
      "bpi": `174`,
      "id": 32,
      "n": `Lipscomb`,
      "i": 31
    },
    {
      "eid": 222,
      "a": `Vill`,
      "r": `30-4`,
      "s": 1,
      "c": `0022B4`,
      "e": false,
      "sl": 32,
      "bpi": `1`,
      "id": 33,
      "n": `Villanova`,
      "i": 32
    },
    {
      "eid": -1,
      "a": `LIU/RAD`,
      "r": ``,
      "s": 16,
      "c": `183563`,
      "e": false,
      "sl": 33,
      "bpi": ``,
      "id": 34,
      "n": `LIU/RAD`,
      "i": 33
    },
    {
      "eid": 259,
      "a": `VT`,
      "r": `21-11`,
      "s": 8,
      "c": `74232D`,
      "e": false,
      "sl": 34,
      "bpi": `28`,
      "id": 35,
      "n": `Virginia Tech`,
      "i": 34
    },
    {
      "eid": 333,
      "a": `ALA`,
      "r": `19-15`,
      "s": 9,
      "c": `690014`,
      "e": false,
      "sl": 35,
      "bpi": `52`,
      "id": 36,
      "n": `Alabama`,
      "i": 35
    },
    {
      "eid": 277,
      "a": `WVU`,
      "r": `24-10`,
      "s": 5,
      "c": `FFC600`,
      "e": false,
      "sl": 36,
      "bpi": `10`,
      "id": 37,
      "n": `West Virginia`,
      "i": 36
    },
    {
      "eid": 93,
      "a": `MURR`,
      "r": `26-5`,
      "s": 12,
      "c": `002148`,
      "e": false,
      "sl": 37,
      "bpi": `62`,
      "id": 38,
      "n": `Murray State`,
      "i": 37
    },
    {
      "eid": 2724,
      "a": `WICH`,
      "r": `25-7`,
      "s": 4,
      "c": `0d0a03`,
      "e": false,
      "sl": 38,
      "bpi": `11`,
      "id": 39,
      "n": `Wichita State`,
      "i": 38
    },
    {
      "eid": 276,
      "a": `MRSH`,
      "r": `24-10`,
      "s": 13,
      "c": `186329`,
      "e": false,
      "sl": 39,
      "bpi": `124`,
      "id": 40,
      "n": `Marshall`,
      "i": 39
    },
    {
      "eid": 57,
      "a": `FLA`,
      "r": `20-12`,
      "s": 6,
      "c": `13299e`,
      "e": false,
      "sl": 40,
      "bpi": `24`,
      "id": 41,
      "n": `Florida`,
      "i": 40
    },
    {
      "eid": -1,
      "a": `BON/LA`,
      "r": ``,
      "s": 11,
      "c": `3691C6`,
      "e": false,
      "sl": 41,
      "bpi": ``,
      "id": 42,
      "n": `BON/LA`,
      "i": 41
    },
    {
      "eid": 2641,
      "a": `TTU`,
      "r": `24-9`,
      "s": 3,
      "c": `C80025`,
      "e": false,
      "sl": 42,
      "bpi": `13`,
      "id": 43,
      "n": `Texas Tech`,
      "i": 42
    },
    {
      "eid": 2617,
      "a": `SFA`,
      "r": `28-6`,
      "s": 14,
      "c": `393996`,
      "e": false,
      "sl": 43,
      "bpi": `109`,
      "id": 44,
      "n": `SF Austin`,
      "i": 43
    },
    {
      "eid": 8,
      "a": `ARK`,
      "r": `23-11`,
      "s": 7,
      "c": `9c1831`,
      "e": false,
      "sl": 44,
      "bpi": `38`,
      "id": 45,
      "n": `Arkansas`,
      "i": 44
    },
    {
      "eid": 2086,
      "a": `BUT`,
      "r": `20-13`,
      "s": 10,
      "c": `0d1361`,
      "e": false,
      "sl": 45,
      "bpi": `25`,
      "id": 46,
      "n": `Butler`,
      "i": 45
    },
    {
      "eid": 2509,
      "a": `PUR`,
      "r": `28-6`,
      "s": 2,
      "c": `B89D29`,
      "e": false,
      "sl": 46,
      "bpi": `4`,
      "id": 47,
      "n": `Purdue`,
      "i": 46
    },
    {
      "eid": 2239,
      "a": `CSF`,
      "r": `20-11`,
      "s": 15,
      "c": `10219c`,
      "e": false,
      "sl": 47,
      "bpi": `182`,
      "id": 48,
      "n": `CSU Fullerton`,
      "i": 47
    },
    {
      "eid": 2305,
      "a": `KU`,
      "r": `27-7`,
      "s": 1,
      "c": `0022B4`,
      "e": false,
      "sl": 48,
      "bpi": `8`,
      "id": 49,
      "n": `Kansas`,
      "i": 48
    },
    {
      "eid": 219,
      "a": `PENN`,
      "r": `24-8`,
      "s": 16,
      "c": `082A74`,
      "e": false,
      "sl": 49,
      "bpi": `100`,
      "id": 50,
      "n": `Penn`,
      "i": 49
    },
    {
      "eid": 2550,
      "a": `HALL`,
      "r": `21-11`,
      "s": 8,
      "c": `0857B1`,
      "e": false,
      "sl": 50,
      "bpi": `29`,
      "id": 51,
      "n": `Seton Hall`,
      "i": 50
    },
    {
      "eid": 152,
      "a": `NCST`,
      "r": `21-11`,
      "s": 9,
      "c": `EF1216`,
      "e": false,
      "sl": 51,
      "bpi": `46`,
      "id": 52,
      "n": `NC State`,
      "i": 51
    },
    {
      "eid": 228,
      "a": `CLEM`,
      "r": `23-9`,
      "s": 5,
      "c": `7F011B`,
      "e": false,
      "sl": 52,
      "bpi": `18`,
      "id": 53,
      "n": `Clemson`,
      "i": 52
    },
    {
      "eid": 166,
      "a": `NMSU`,
      "r": `28-5`,
      "s": 12,
      "c": `0079C2`,
      "e": false,
      "sl": 53,
      "bpi": `70`,
      "id": 54,
      "n": `New Mexico State`,
      "i": 53
    },
    {
      "eid": 2,
      "a": `AUB`,
      "r": `25-7`,
      "s": 4,
      "c": `03244d`,
      "e": false,
      "sl": 54,
      "bpi": `19`,
      "id": 55,
      "n": `Auburn`,
      "i": 54
    },
    {
      "eid": 232,
      "a": `COFC`,
      "r": `26-7`,
      "s": 13,
      "c": `9c8456`,
      "e": false,
      "sl": 55,
      "bpi": `117`,
      "id": 56,
      "n": `Charleston`,
      "i": 55
    },
    {
      "eid": 2628,
      "a": `TCU`,
      "r": `21-11`,
      "s": 6,
      "c": `000000`,
      "e": false,
      "sl": 56,
      "bpi": `21`,
      "id": 57,
      "n": `TCU`,
      "i": 56
    },
    {
      "eid": -1,
      "a": `ASU/SY`,
      "r": ``,
      "s": 11,
      "c": `633194`,
      "e": false,
      "sl": 57,
      "bpi": ``,
      "id": 58,
      "n": `ASU/SY`,
      "i": 57
    },
    {
      "eid": 127,
      "a": `MSU`,
      "r": `29-4`,
      "s": 3,
      "c": `18453B`,
      "e": false,
      "sl": 58,
      "bpi": `6`,
      "id": 59,
      "n": `Michigan State`,
      "i": 58
    },
    {
      "eid": 2083,
      "a": `BUCK`,
      "r": `25-9`,
      "s": 14,
      "c": `000060`,
      "e": false,
      "sl": 59,
      "bpi": `82`,
      "id": 60,
      "n": `Bucknell`,
      "i": 59
    },
    {
      "eid": 227,
      "a": `URI`,
      "r": `25-7`,
      "s": 7,
      "c": `3691C6`,
      "e": false,
      "sl": 60,
      "bpi": `31`,
      "id": 61,
      "n": `URI`,
      "i": 60
    },
    {
      "eid": 201,
      "a": `OKLA`,
      "r": `18-13`,
      "s": 10,
      "c": `7b0000`,
      "e": false,
      "sl": 61,
      "bpi": `42`,
      "id": 62,
      "n": `Oklahoma`,
      "i": 61
    },
    {
      "eid": 150,
      "a": `DUKE`,
      "r": `26-7`,
      "s": 2,
      "c": `001A57`,
      "e": false,
      "sl": 62,
      "bpi": `3`,
      "id": 63,
      "n": `Duke`,
      "i": 62
    },
    {
      "eid": 314,
      "a": `IONA`,
      "r": `20-13`,
      "s": 15,
      "c": `8c001a`,
      "e": false,
      "sl": 63,
      "bpi": `113`,
      "id": 64,
      "n": `Iona`,
      "i": 63
    }
  ];

  teams.forEach((t) => {
    t.isEliminated = t.e;
    return t;
  });

  return teams;
}
