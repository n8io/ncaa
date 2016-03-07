const path = require(`path`);

module.exports = (gulp, plugins, cfg) => {
  require(`fs`).readdirSync(__dirname).forEach((file) => {
    if (file.toLowerCase() === `index.js`) {
      return;
    }

    require(path.join(__dirname, file))(gulp, plugins, cfg);
  });
};
