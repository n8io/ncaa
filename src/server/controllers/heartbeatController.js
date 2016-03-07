const heartbeatController = function() {};

module.exports = heartbeatController;

heartbeatController.heartbeat = heartbeat;

function heartbeat(req, res) {
  return res.status(200).json({message: `OK`});
}
