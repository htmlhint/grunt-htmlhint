<h1 align="center">
  <br>
  Grunt HTMLHint
  <br>
</h1>

<h4 align="center">Lint HTML files with HTMLHint</h4>

<p align="center">
  <a href="https://travis-ci.org/htmlhint/grunt-htmlhint">
    <img src="https://img.shields.io/travis/htmlhint/grunt-htmlhint.svg" alt="Travis Build Status">
  </a>
  <a href="https://codecov.io/gh/htmlhint/grunt-htmlhint">
    <img src="https://codecov.io/gh/htmlhint/grunt-htmlhint/branch/master/graph/badge.svg" alt="Codecov">
  </a>
  <a href="https://www.npmjs.com/package/grunt-htmlhint">
    <img src="https://img.shields.io/npm/dm/grunt-htmlhint.svg" alt="NPM count">
  </a>
  <img src="https://badgen.net/badge/license/MIT/green" alt="MIT Licence" />
  <a href="https://discord.gg/nJ6J9CP">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat">
  </a>
  <a href="http://roadmap.htmlhint.io/roadmap">
    <img src="https://img.shields.io/badge/check-our%20roadmap-EE503E.svg" alt="Chat">
  </a>
</p>

<p align="center">
  <a href="#getting-started">How To Use</a> • <a href="/CONTRIBUTING.md">Contributing</a> • <a href="http://roadmap.htmlhint.io/">Roadmap</a> • <a href="https://htmlhint.io">Website</a>
</p>

## Table of Contents

- **[Getting Started](#getting-started)**
- **[Usage](#usage)**
- **[Options](#options)**

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-htmlhint --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-htmlhint');
```

## Usage

### Overview
In your project's Gruntfile, add a section named `htmlhint` to the data object passed into `grunt.initConfig()`.

### Options

See all rules here: [https://github.com/htmlhint/HTMLHint/wiki/Rules](https://github.com/htmlhint/HTMLHint/wiki/Rules)

If options is empty, task will scan nothing.

#### options.htmlhintrc
Type: `String`
Default value: `null`

If this filename is specified, options and globals defined therein will be used. Task and target options override the options within the `htmlhintrc` file. The `htmlhintrc` file must be valid JSON and looks something like this:

```json
{
  "tag-pair": true,
}
```

#### options.force
Type: `Boolean`
Default value: `false`

Report HTMLHint errors but dont fail the task

### Usage Examples

#### Direct options

```js
htmlhint: {
  html1: {
    options: {
      'tag-pair': true
    },
    src: ['path/to/**/*.html']
  },
  html2: {
    options: {
      'tag-pair': true
    },
    src: ['path/to/**/*.html']
  }
}
```

#### Config file

```js
htmlhint: {
  options: {
    htmlhintrc: '.htmlhintrc'
  },
  html1: {
    src: ['path/to/**/*.html']
  },
  html2: {
    src: ['path/to/**/*.html']
  }
}
```

## Licence

Project initially created by [@yaniswang](https://github.com/yaniswang) and transferred to the [HTMLHint](https://github.com/htmlhint) organization.

[MIT License](./LICENSE)
