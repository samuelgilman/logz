var path = require('path');
var assert = require('assert');
var fs = require('fs');
var tmp = require('tmp');

describe('Logz module', function() {

    var oDir, // original process working dir
        wDir; //current process working dir

    before(function() {

        oDir = process.cwd();

    });

    beforeEach(function(done) {

        // Before testing each function of the module,
        // we want to create a temporary directory in
        // which all log files and directories will be
        // created.

        tmp.dir(function(err, path) {

            if (err) {
                throw err;
            }

            try {

                wDir = path;
                process.chdir(wDir);
                done();

            } catch (err) {

                throw err;

            }

        });

    });

    describe("function 'init' with default params", function() {

        var logz;

        before(function() {

            logz = require(path.resolve(oDir));
            logz.init();

        });

        it('should use default params', function() {

            var logzDir = path.resolve(logz.dir),
                defDir = path.resolve("./logs"),
                logzFile = path.resolve(logz.file),
                defFile = path.resolve("/log.txt", defDir),
                logzLevel = logz.level,
                defLevel = 'debug',
                logzDev = logz.dev,
                defDev = true;

            console.log("DEF: " + defDir);

            assert.equal(logzDir, defDir);
            assert.equal(logzFile, defFile);
            assert.equal(logzLevel, defLevel);
            assert.equal(logzDev, defDev);

        });

    });

    describe("function 'init' with custom params", function() {

        var logz;

        before(function(done) {

            logz = require(path.resolve(oDir)),
            cusParams = {
                dir: "./journal",
                file: "/journal.txt",
                level: "info",
                console: false
            };

            fs.mkdir(path.resolve(cusParams.dir), function(err) {

                if (err) throw err;
                logz.init(cusParams);
                done();

            });

        });

        it('should use params when params are passed', function() {

            var logzDir = path.resolve(logz.dir),
                cusDir = path.resolve(cusParams.dir),
                logzFile = path.resolve(logz.file),
                cusFile = path.resolve(cusParams.file),
                logzLevel = logz.level,
                cusLevel = cusParams.level,
                logzDev = logz.dev,
                cusDev = cusParams.dev;

            assert.equal(logzDir, cusDir);
            assert.equal(logzFile, cusFile);
            assert.equal(logzLevel, cusLevel);
            assert.equal(logzDev, cusDev);

        });

    });

});