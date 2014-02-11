# Logz

Version: 1.1.0

Logz is a simple, dependency free, Node.js module for logging.

### Use 

`npm install logz`

Logz must be initialized, but if no params are sent on init the values
below are used.

    #!Javascript
    var logz = require('logz');

    logz.init({
      dir: './logs', // logs directory
      file: 'log.txt', // log file name
      level: 'debug', // err, info, debug
      console: true // log to console
    }, cb);

#### Async initialization

Logz initialization is async because it involves access to the filesystem.
The `init` function takes an optional callback. The log is ready to be used
when the filesystem is ready (directories have been created, streams have
been opened, etc).

It's okay to use the log before it is ready. but if any log entries are made
(with `err`, `info`, etc.) before the log is ready, they will be queued in
memory, and flushed to the log stream once it's ready.

#### Async logging

Same goes for the logging functions (`err`, etc) - they are async because
data needs to be written to the stream.

It's not necessary to use callback with the logging function. Use them only
if you want to know when the data was actually written.

In any case, the timestamp will be for when the function was called, and not
for when the data was written.

### Format

Format for all log entries is: `[timestamp] [level] [log message]`

### Levels

There are three levels: err, info, and debug.

All logging functions take an optional callback which will be executed when:

* The data is written to the file, if the log is ready.
* The data is stored in memory, if the log is not ready.

#### err

Logged for all levels.

`logz.err('something failed', cb)`

#### info

Logged for err, and info levels.

`logz.info('something happened', cb)`

#### debug

Logged only for the debug level.

`logz.debug('some response object', cb)`
