module.exports = {

  init: function (params) {

    var that = this;
    var fs = require('fs');
    var path = require('path');
    var level = (params.level || 'debug');
    var dir = path.resolve(params.dir || './logs');
    var file = path.resolve(dir + (params.file || '/log.txt'));
    var dev = (params.console || true);

    that.fs = fs;
    that.path = path;
    that.dir = dir;
    that.file = file;
    that.level = level;
    that.dev = dev;

    that.mkdir();
    that.touch();

  },

  mkdir: function () {

    var that = this;
    var fs = that.fs;
    var dir = that.dir;

    fs.exists(dir, function (exists) {
      if (!exists) {
        fs.mkdirSync(dir);
      }
    });

  },

  touch: function () {

    var that = this;
    var fs = that.fs;
    var file = that.file;
    var date = new Date();
    var time = date.getTime();

    fs.exists(file, function (exists) {
      if (!exists) {
        fs.writeFileSync(file, ('LOGZ ' + time));
      }
    });

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
    var file = that.file;
    var dev = that.dev;
    var date = new Date();
    var time = date.getTime();

    message = (time + ' ' + message);

    if (dev) {
      console.log(message); 
    }

    fs.appendFile(file, (message + '\n'), function (err) {

      if (err) {
        console.log('LOGZ ' + err);
      }

    });

  }

};
