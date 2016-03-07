const fs = require(`fs`);
const request = require(`request`);
const semver = require(`semver`);
const cwd = require(`cwd`);
const chalk = require(`chalk`);
const packageJson = require(cwd(`package.json`));
const destPath = cwd(`.nvmrc`);
const reqOpts = {
  uri: `https://semver.io/node.json`,
  json: true
};

if (process.env.DOCKER_FORCE_NODE_VERSION) {
  writeRc(process.env.DOCKER_FORCE_NODE_VERSION);
}
else {
  request.get(reqOpts, (err, res) => {
    const semversions = res.body;
    const version = semver.maxSatisfying(semversions.stableVersions, packageJson.engines.node);

    writeRc(version);
  });
}

function writeRc(nodeVersion) {
  fs.writeFile(destPath, nodeVersion, (err) => {
    if (err) {
      console.log(chalk.red(`Failed to write .nvmrc ${err}`)); // eslint-disable-line

      return;
    }

    console.log(chalk.green(`.nvmrc file updated`)); // eslint-disable-line
  });
}
