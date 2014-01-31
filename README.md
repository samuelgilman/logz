# logz

Logz is a simple, dependency free, Node.js module for logging.

### Clone

<pre>
git clone https://github.com/samuelgilman/logz.git
</pre>

### Require

<pre>
var logz = require('logz');
</pre>

### Initialize

Logz must be initialized but if no params are sent on init the values below are used.

<pre>
var logz = require('logz');

logz.init({
  dir: './logs', // logs directory
  file: '/log.txt', // log file name
  level: 'debug', // err, info, debug
  console: true // log to console
});

</pre>

### Levels

There are three levels: err, info, and debug.

#### err

Logged for all levels.

<pre>
logz.err('something failed')
// -> timestamp ERROR something failed
</pre>

#### info

Logged for err, and info levels.

<pre>
logz.info('something happened')
// -> timestamp INFO something happened
</pre>

#### debug

Logged only for the debug level.

<pre>
logz.debug('some response object')
// -> timestamp DEBUG some response object
</pre>

</pre>
