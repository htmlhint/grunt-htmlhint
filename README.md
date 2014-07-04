# grunt-htmlhint

> Lint html files with htmlhint.

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

## The "htmlhint" task

### Overview
In your project's Gruntfile, add a section named `htmlhint` to the data object passed into `grunt.initConfig()`.

### Options

See all rules here: [https://github.com/yaniswang/HTMLHint/wiki/Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules)

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

## Release History

 * 2013-4-6   v0.4.0   First release