var path = require('path');
var assert = require('assert');
var fs = require('fs');
var tmp = require('tmp');

describe('Logz module', function() {

    var oDir, // original process working dir
        wDir; //current process working dir

    var changeCWD = function(done) {

        // Before testing each function of the module,
        // we want to create a temporary directory in
        // which all log files and directories will be
        // created.

        // note that 'tmp.dir' is async, so we have to
        // call 'done()' when the callback is finished
        // to make sure this 'beforeEach' hook is synched.

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

    }

    before(function() {

        // before doing anything and changing the
        // working directory, we have to save the
        // current directory in which the 'logz'
        // module resides, so we can import it.

        oDir = process.cwd();

    });

    describe("Default params", function() {

        var logz;

        before(changeCWD);

        before(function(done) {

            logz = require(path.resolve(oDir));
            logz.init();
            done();

        });

        it('should use default params', function() {

            var logzDir = path.resolve(logz.dir),
                defDir = path.resolve("./logs"),
                logzFile = path.resolve(logz.file),
                defFile = path.resolve(defDir, "log.txt"),
                logzLevel = logz.level,
                defLevel = 'debug',
                logzDev = logz.dev,
                defDev = true;

            assert.equal(logzDir, defDir);
            assert.equal(logzFile, defFile);
            assert.equal(logzLevel, defLevel);
            assert.equal(logzDev, defDev);

        });

        it('should create a log file', function(done) {

            fs.exists(path.resolve(logz.file), function(exists) {
                assert.equal(exists, true);
                done();
            });

        });

        it('should log errors', function(done) {

            var errorText = "Lorem ipsum dolor";

            logz.err(errorText, function() {

                fs.readFile(path.resolve(logz.file), 'utf-8', function(err, data) {

                    if (err) throw err;

                    var lines = data.trim().split('\n');
                    var lastLine = lines.slice(-1)[0];

                    assert.notEqual(lastLine.indexOf(errorText), -1,
                        "Error text was not logged");
                    assert.notEqual(lastLine.indexOf("ERROR"), -1,
                        "Log message not logged as an error")

                    done();

                });

            });

        })

    });

    describe("Custom params", function() {

        var logz;

        before(changeCWD);

        before(function(done) {

            logz = require(path.resolve(oDir)),
            cusParams = {
                dir: "./journal",
                file: "journal.txt",
                level: "info",
                console: false
            };

            fs.mkdir(path.resolve(cusParams.dir), function(err) {

                if (err) throw err;
                logz.init(cusParams);
                done();

            });

        });

        it('should use custom params', function() {

            var logzDir = path.resolve(logz.dir),
                cusDir = path.resolve(cusParams.dir),
                logzFile = path.resolve(logz.file),
                cusFile = path.resolve(cusDir, cusParams.file),
                logzLevel = logz.level,
                cusLevel = cusParams.level,
                logzDev = logz.dev,
                cusDev = cusParams.console;

            assert.equal(logzDir, cusDir);
            assert.equal(logzFile, cusFile);
            assert.equal(logzLevel, cusLevel);
            assert.equal(logzDev, cusDev);

        });

    });

});