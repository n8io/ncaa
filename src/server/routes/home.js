const fs = require(`fs`);
const express = require(`express`);
const cwd = require(`cwd`);
const pkgjson = require(cwd(`package.json`));
const bwrjson = JSON.parse(fs.readFileSync(cwd(`.bowerrc`), `utf-8`).toString());

module.exports = function home(app, options) {
  const router = express.Router();

  // Capture all html routes here because we are SPA
  const spaRoutes = [
    `/register`,
    `/rules`,
    `/payment`,
    `/info`,
    `/`
  ];

  router.get(spaRoutes, function(req, res, next) {
    if (!req.accepts(`html`)) {
      return next();
    }

    options = options || {};

    return res.render(`index`, {pkgjson: pkgjson, bwrjson: bwrjson});
  });

  app.use(`/`, router);
};
