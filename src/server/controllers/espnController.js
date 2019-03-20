const R = require(`ramda`);
const request = require(`request`);
const teams = require('./teams');
const _ = require(`lodash`);
const espnController = function() {};
const year = process.env.YEAR || new Date().getFullYear();
const groupId = process.env.ESPN_GROUP_ID || -1;
const espnBrackUrl = `https://fantasy.espncdn.com/tournament-challenge-bracket/${year}/en/api/group?groupID=${groupId}&start=0&length=500`;

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
);

espnController.getPoolInfo = getPoolInfo;

module.exports = espnController;

function getPoolInfo(callback) {
  const opts = {};

  opts.uri = espnBrackUrl;
  opts.qs = { noc: new Date().getTime() };
  opts.json = true;

  request(opts, onRequestResponse);

  function onRequestResponse(err, resp, body) {
    const data = body;

    if (err || resp.statusCode !== 200) {
      return callback(err);
    }

    /*
    {
      "pct": 0,
      "tied": false,
      "ps": "",
      "f": false,
      "swid": "{D6DF56BE-2E74-48EF-ADE8-381F3600E93D}",
      "f_g": false,
      "p": 0,
      "n_d": "n8io",
      "r": -1,
      "n_e": "Naterade",
      "p_dwp": 0,
      "id": 18369166,
      "n_m": "6NateDogg9"
    }
    */

    const entries = R.pipe(
      R.pathOr([], [`g`, `e`]),
      R.map(
        R.pipe(
          R.pick([`id`, `p`, `pct`, `ppr`, `n_d`, `n_e`]),
          renameKeys({
            p: `points`,
            pct: `percent`,
            n_d: `userName`,
            n_e: `entryName`
          })
        )
      )
    )(data);

    const maxEntriesPerUser = R.pathOr(1, [`g`, `max`], data);

    // entries = data.group.entries.map(e => {
    //   e.winningTeam = _.find(teams, { id: e.winningTeamID });

    //   e.periodPoints = _(e.periodPoints)
    //     .values()
    //     .value();

    //   return e;
    // });

    const output = {
      group: { entries: entries },
      maxEntriesPerUser: maxEntriesPerUser
    };

    return callback(null, output);
  }
}
