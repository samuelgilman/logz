module.exports = {

  init: function(params) {

    params = (params || {
      dir: './logs',
      file: 'log.txt',
      level: 'debug',
      console: true
    });

    var that = this;
    var fs = require('fs');
    var path = require('path');
    var level = params.level;
    var dir = path.resolve(params.dir);
    var file = path.resolve(dir, params.file);
    var dev = params.console;

    that.fs = fs;
    that.path = path;
    that.dir = dir;
    that.file = file;
    that.level = level;
    that.dev = dev;
    that._ready = false;
    that._msgQueue = [];

    that.initMkdir(function() {

      that.initStream(function() {

        that._setReady();

      });

    });

  },

  isReady: function() {

    var that = this;

    return that._ready;

  },

  initMkdir: function(next) {

    var that = this;
    var fs = that.fs;
    var dir = that.dir;

    fs.mkdir(dir, function(err) {

      // TODO:
      // Check for 'err' errors.
      // Possible errors:
      // 1. Directory already exists. In that case continue.
      // 2. File system errors, etc.

      next();

    });

  },

  _setReady: function(next) {

    var that = this;
    var msg;

    while (msg = that._msgQueue.shift()) {
      that.stream.write(msg + "\n");
    }

    that._ready = true;

    if (next) next();

  },

  initStream: function(next) {

    var that = this;
    var fs = that.fs;
    var file = that.file;
    var stream = fs.createWriteStream(file);

    that.stream = stream;

    next();

  },

  err: function(message, next) {

    var that = this;
    var logger = that.logger;

    that.log('ERROR ' + message, next);

  },

  info: function(message, next) {

    var that = this;
    var level = that.level;

    if (level === 'info' || level === 'debug') {
      that.log('INFO ' + message, next);
    }

  },

  debug: function(message, next) {

    var that = this;
    var level = that.level;

    if (level === 'debug') {
      that.log('DEBUG ' + message, next);
    }

  },

  log: function(message, next) {

    var that = this;
    var fs = that.fs;
    var stream = that.stream;
    var dev = that.dev;
    var date = new Date();
    var time = date.getTime();

    message = time + ' ' + message;

    if (dev) {
      console.log(message);
    }

    if (that.isReady()) {
      stream.write(message + '\n', next);
    } else {
      that._msgQueue.push(message);
      if (next) next();
    }

  }

};