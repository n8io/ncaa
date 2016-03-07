'use strict';

const _ = require(`lodash`);
const util = require(`gulp-util`);

module.exports = parseResults;

function parseResults(results) {
  const summaryMsgs = [];
  const summary = {
    errors: _.sumBy(results, (info) => info.errorCount),
    warnings: _.sumBy(results, (info) => info.warningCount)
  };

  if (!summary.errors && !summary.warnings) {
    return; // Nothing to report
  }

  const fileResults = _.filter(results, (obj) => obj.errorCount || obj.warningCount);

  util.log(``);

  _.each(fileResults, (file) => {
    reportFilename(file.filePath, file.errorCount, file.warningCount);

    _.each(file.messages, (msg) => {
      switch (msg.severity) {
        case 1:
          reportWarning(msg);
          break;
        case 2:
          reportError(msg);
          break;
        default:
          break;
      }
    });

    util.log(``);
  });

  if (summary.warnings) {
    summaryMsgs.push(`${util.colors.yellow(summary.warnings)} warnings.`);
  }

  if (summary.errors) {
    summaryMsgs.push(`${util.colors.red(summary.errors)} errors.`);
  }

  if (summaryMsgs.length) {
    util.log(`  ESLint summary: ${summaryMsgs.join(` `)}`);
    util.log(``);
  }
}

function reportFilename(filePath, errorCount, warningCount) {
  util.log(
      util.colors.cyan(`  File ${filePath}`),
      util.colors.yellow(`${warningCount} warnings`),
      `/`,
      util.colors.red(`${errorCount} errors`)
    )
    ;
}

function reportError(message) {
  util.log(
      `    ${util.colors.red(`${message.message} [${message.ruleId}]`)}: ${message.source}`,
      util.colors.gray(`${message.line}:${message.column}`)
    )
    ;
}

function reportWarning(message) {
  util.log(
      `    ${util.colors.yellow(`${message.message} [${message.ruleId}]`)}`,
      `: ${message.source}`,
      util.colors.gray(`${message.line}:${message.column}`)
    )
    ;
}
