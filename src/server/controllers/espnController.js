var espnController = function() {};
var espnBrackUrl = 'http://games.espn.go.com/tournament-challenge-bracket'
  + '/2015/en/api/v3/group?sort=-1&start=0&length=50&enable=periodPoints&groupID=651658';

espnController.getBracketInfo = getBracketInfo;

module.exports = espnController;

function getBracketInfo(req, res, next) {
  var opts = {}

  opts.uri = espnBrackUrl;
  opts.json = true;

  request(opts, onRequestResponse);

  function onRequestResponse(err, resp, body) {
    if(err || resp.statusCode !== 200) {
      return next(err || new Error('Returned bad response. ' + resp.statusCode));
    }

    return res.json(body);
  }
}
