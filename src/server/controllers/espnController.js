const R = require(`ramda`);
const request = require(`request`);
const teams = require('./teams');
const _ = require(`lodash`);
const espnController = function() {};
const year = process.env.YEAR || new Date().getFullYear();
const groupId = process.env.ESPN_GROUP_ID || -1;
const espnBracketUrl = `https://fantasy.espncdn.com/tournament-challenge-bracket/${year}/en/api/group?groupID=${groupId}&start=0&length=500`;

const startTime = new Date(parseInt(process.env.START_TIME_MS, 10))

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
);

espnController.getPoolInfo = getPoolInfo;

module.exports = espnController;

const addWinningTeamInfo = ({ picks, ...entry }) => {
  if (new Date() < startTime) return entry

  if (!picks || !picks.length) return null;

  const seedId = Number(R.last(picks.split('|')));
  const winningTeam = R.pick(
    ['color', 'id', 'isEliminated', 'name'],
    teams[seedId] || {}
  );

  // console.log({ id, winningTeam });

  return R.isEmpty(winningTeam)
    ? undefined
    : R.assoc('winningTeam', winningTeam)(entry);
};

function getPoolInfo(callback) {
  const opts = {};

  opts.uri = espnBracketUrl;
  opts.qs = { noc: new Date().getTime() };
  opts.json = true;
  opts.rejectUnauthorized = false
  opts.strictSSL = false;

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

    const transformProps = R.pipe(
      R.pick([`id`, `p`, `pct`, `ppr`, `ps`, `n_d`, `n_e`, `r`]),
      renameKeys({
        p: `points`,
        pct: `percent`,
        n_d: `userName`,
        n_e: `entryName`,
        ps: 'picks',
        r: `rank`
      }),
      R.evolve({
        percent: pct => (pct ? Number(pct.toFixed(1)) : 0)
      })
    );

    const entries = R.pipe(
      R.pathOr([], [`g`, `e`]),
      R.map(
        R.pipe(
          transformProps,
          x => console.log(x) || x,
          addWinningTeamInfo
        )
      )
    )(data);

    const maxEntriesPerUser = R.pathOr(1, [`g`, `max`], data);

    const output = {
      group: { entries: entries },
      maxEntriesPerUser: maxEntriesPerUser
    };

    return callback(null, output);
  }
}
