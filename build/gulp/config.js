const fs = require(`fs`);
const cwd = require(`cwd`);
const shell = require(`shelljs`);
const moment = require(`moment`);
const nib = require(`nib`);

const buildDir = cwd(`build`);
const srcDir = cwd(`src`);
const testDir = cwd(`test`);
const distDir = cwd(`dist`);
const bowerCfg = JSON.parse(
  fs.readFileSync(cwd(`.bowerrc`), `utf-8`).toString()
);
const validEnvironments = {
  local: `local`,
  dev: `dev`,
  development: `dev`,
  qa: `qa`,
  uat: `uat`,
  prod: `prod`,
  production: `prod`,
};
const now = moment();

require(`dotenv-safe`).load({ silent: true });

const cfg = {
  localEnv: `local`,
  env: validEnvironments[process.env.NODE_ENV || ``] || validEnvironments.prod,
  clean: {
    src: [distDir],
  },
  css: {
    src: cwd(srcDir, `client/precompile/css/**/*.styl`),
    dest: {
      file: `style.min.css`,
      dir: cwd(distDir, `css`),
    },
    options: {
      local: {
        linenos: true,
        use: nib(),
        import: [`nib`],
      },
      other: {
        compress: true,
        use: nib(),
        import: [`nib`],
      },
    },
    banner: {
      formatStr: `/* Compiled via gulp-stylus on \${label} [ \${ms} ] */\n`,
    },
  },
  "git-info": {
    dest: cwd(`.git.json`),
  },
  html: {
    src: [cwd(srcDir, `client/precompile/**/*.jade`)],
    dest: cwd(`dist/html/`),
    min: {
      options: {
        quoteCharacter: `'`,
        removeComments: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        caseSensitive: true,
      },
    },
    jade: {
      data: {
        cacheKey: now.format(`x`),
        env:
          validEnvironments[process.env.NODE_ENV || ``] ||
          validEnvironments.prod,
      },
    },
    beautify: {
      options: {
        indentSize: 2,
        maxPreserveNewlines: 2,
        wrapLineLength: 0,
        unformatted: [`pre`],
      },
    },
  },
  js: {
    client: {
      src: [
        cwd(srcDir, `client/precompile/js/app/_*.mdul.js`),
        cwd(srcDir, `client/precompile/js/app/_common/**/*.js`),
        cwd(srcDir, `client/precompile/js/app/**/*.mdul.js`),
        cwd(srcDir, `client/precompile/js/app/**/*.js`),
      ],
      dest: cwd(distDir, `js`),
      filename: `script.min.js`,
      filenameDebug: `script.js`,
      jsbeautifier: {
        config: cwd(`.jsbeautifyrc`),
      },
      uglify: {
        mangle: true,
        compress: true,
      },
      banner: {
        formatStr: `/* Compiled via gulp-uglify on \${label} [ \${ms} ] */\n`,
      },
      ngAnnotate: {
        single_quotes: true,
      },
    },
    server: {
      src: [
        cwd(srcDir, `server/**/*.js`),
        cwd(buildDir, `**/*.js`),
        cwd(testDir, `**/*.js`),
      ],
    },
  },
  nodemon: {
    script: cwd(process.env[`npm_package_main`]),
    ext: `js json`,
    watch: [cwd(srcDir, `server/**/*.js`)],
    env: {
      NODE_ENV:
        validEnvironments[process.env.NODE_ENV || ``] ||
        validEnvironments.local,
    },
    nodeArgs: [`--inspect`],
  },
  start: {
    ms: now.format(`x`),
    label: now.format(`dddd, MMMM Do YYYY, h:mm:ssA Z`),
  },
  statics: {
    bower: {
      src: cwd(bowerCfg.directory),
      baseDir: `./src/client/statics`,
      dest: cwd(distDir, `statics`),
    },
  },
  test: {
    all: {
      src: [cwd(`test/test.spec.js`)],
      options: {
        reporter: `spec`,
        growl: true,
      },
    },
    unit: {
      src: [cwd(`test/unit/unit.spec.js`)],
      options: {
        reporter: `spec`,
        growl: true,
      },
    },
    integration: {
      src: [cwd(`test/integration/integration.spec.js`)],
      options: {
        reporter: `spec`,
        growl: true,
      },
    },
  },
  watch: {
    client: {
      src: [cwd(srcDir, `client/precompile/js/**/*.js`)],
    },
  },
};

cfg.git = {
  commit: (
    shell.exec(`git rev-parse --verify HEAD`, { silent: true }).output || ``
  )
    .split(`\n`)
    .join(``),
  branch: (
    shell.exec(`git rev-parse --abbrev-ref HEAD`, { silent: true }).output || ``
  )
    .split(`\n`)
    .join(``),
};

module.exports = cfg;
