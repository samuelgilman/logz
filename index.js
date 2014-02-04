module.exports = {

  init: function (params) {

    params = (params || {
      dir: './logs', 
      file: '/log.txt',
      level: 'debug',
      console: true
    });

    var that = this;
    var fs = require('fs');
    var path = require('path');
    var level = params.level;
    var dir = path.resolve(params.dir);
    var file = path.resolve(dir + params.file);
    var dev = params.console;

    that.fs = fs;
    that.path = path;
    that.dir = dir;
    that.file = file;
    that.level = level;
    that.dev = dev;

    that.initMkdir();
    that.initTouch();
    that.initStream();

  },

  initMkdir: function () {

    var that = this;
    var fs = that.fs;
    var dir = that.dir;

    fs.exists(dir, function (exists) {
      if (!exists) {
        fs.mkdirSync(dir);
      }
    });

  },

  initTouch: function () {

    var that = this;
    var fs = that.fs;
    var file = that.file;
    var date = new Date();
    var time = date.getTime();

    fs.exists(file, function (exists) {
      if (!exists) {
        fs.writeFileSync(file, (time + ' Logz \n' ));
      }
    });

  },

  initStream: function () {

    var that = this;
    var fs = that.fs;
    var file = that.file;
    var stream = fs.createWriteStream(file);

    that.stream = stream;

  },

  err: function (message) {

    var that = this;
    var logger = that.logger;

    that.log('ERROR ' + message);

  },

  info: function (message) {

    var that = this;
    var level = that.level;

    if (level === 'info' || level === 'debug') {
      that.log('INFO ' + message);
    }

  },

  debug: function (message) {

    var that = this;
    var level = that.level;

    if (level === 'debug') {
      that.log('DEBUG ' + message);
    }

  },

  log: function (message) {

    var that = this;
    var fs = that.fs;
    var stream = that.stream;
    var dev = that.dev;
    var date = new Date();
    var time = date.getTime();

    message = (time + ' ' + message);

    if (dev) {
      console.log(message); 
    }

    stream.write((message + '\n'));

  }

};
