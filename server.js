/// <reference path="typings/tsd.d.ts" />

/**
 * This is a testing environment for
 * viewing possible white flashes
 * when navigating dark sites.
 */

var http = require('http');
var url = require('url');

var PORT1 = 8475;
var PORT2 = 8476;
var HOST1 = '127.0.0.1';
var HOST2 = '127.0.0.1';

createServer(PORT1, HOST1);
createServer(PORT2, HOST2);

/**
 * Creates and starts a server.
 */
function createServer(port, host) {
    http.createServer(function (req, res) {
        var u = url.parse(req.url, true);
    
        // Get parameters
        var query = u.query;
        var delay = ((query && query.delay) ?
            +query.delay
            : 0);
        if (delay > 2000) { delay = 2000; }
        var stylePlace = ((query && query.styleplace) ?
            query.styleplace
            : 'body');
    
        // Write response
        switch (u.pathname) {
            case '':
            case '/':
            case '/index.html':
                writeWithDelay(getHtmlLines(delay, stylePlace), delay, 'text/html');
                break;
            case '/style.css':
                writeWithDelay(getCssLines(), delay, 'text/css');
                break;
            default:
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("404 Not Found\n");
                res.end();
        }

        /**
         * Writes each line to response with delay.
         * Also adds a 4X delay before response start.
         */
        function writeWithDelay(lines, delay, contentType) {
            if (contentType === void 0) { contentType = 'text/plain'; }
            lines = lines.slice(0);
            var write = function () {
                if (lines.length > 0) {
                    // Write line
                    var line = lines.shift();
                    setTimeout(function () {
                        res.write(line + '\n');
                        write();
                    }, delay);
                } else {
                    // End response
                    res.end();
                }
            };

            setTimeout(function () {
                res.setHeader('content-type', contentType);
                write();
            }, delay * 4);
        }

    }).listen(port, host, function () {
        console.info('Listening at port ' + port);
    });
}


//--------
// Content
//--------

// HTML
function getHtmlLines(delay, stylePlace) {
    var result = [];
    result.push(
        '<html>',
        '  <head>',
        '    <title>Chrome kills your eyes</title>'
        );
    if (stylePlace === 'head') {
        result.push(
            '    <style>',
            '      html, body { background-color: #234; }',
            '      html, body, a { color: #edc; }',
            '    </style>'
            );
    }
    if (stylePlace === 'link') {
        result.push('    <link rel="stylesheet" type="text/css" href="style.css?delay=' + delay + '"/>');
    }
    result.push(
        '  </head>',
        '  <body>'
        );
    if (stylePlace === 'body') {
        result.push(
            '    <style>',
            '      html, body { background-color: #234; }',
            '      html, body, a { color: #edc; }',
            '    </style>'
            );
    }
    result.push('    <h1>Chrome kills your eyes</h1>');
    
    // Get links with parameters
    var addresses = [
        'http://' + HOST1 + ':' + PORT1 + '/',
        'http://' + HOST2 + ':' + PORT2 + '/'
    ];
    var delays = [
        0,
        100,
        500
    ];
    var places = [
        'head',
        'body',
        'link'
    ];
    result.push('    <ul>');
    addresses.forEach(function (a) {
        delays.forEach(function (d) {
            places.forEach(function (p) {
                var url = a + '?delay=' + d + '&styleplace=' + p;
                var text = 'server: ' + a
                    + '&nbsp;&nbsp;&nbsp;&nbsp;delay: ' + d
                    + 'ms&nbsp;&nbsp;&nbsp;&nbsp;style place: ' + p;
                result.push('    <li><a href="' + url + '">' + text + '</a></li>');
            });
        });
        result.push('    <br/>');
    });
    result.push('    </ul>');

    result.push(
        '    <h3>Current delay is ' + delay + 'ms</h3>',
        '    <h3>Style is placed at ' + stylePlace + '</h3>',
        '  </body>',
        '</html>'
        );
    return result;
}

// CSS
function getCssLines() {
    return [
        '/*',
        ' * Comments',
        ' * Comments',
        ' * Comments',
        ' * Comments',
        ' */',
        'html, body { background-color: #234; }',
        'html, body, a { color: #edc; }'
    ];
}