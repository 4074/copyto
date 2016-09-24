'use strict';

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 4000;
var app = (0, _express2.default)();

var store = {};

app.use(_express2.default.static(__dirname + './../static'));
app.engine('pug', _pug2.default.__express);
app.use(_bodyParser2.default.urlencoded());

app.get('/', function (req, res) {
    res.render('index.pug');
});

app.get('/receive/:md5', function (req, res) {
    var time = getTimeID();
    var key = req.params.md5;
    if (store[time] && store[time].hasOwnProperty(key)) {
        res.send('receive.pug', { content: store[time][key] });
    }
    res.render('receive.pug', { content: 'Timeout or nothing.' });
});

app.post('/send', function (req, res) {
    var time = getTimeID();
    var content = req.body.content;

    var json = { status: false };
    if (content.length <= 600) {
        var key = getkey(content);
        if (!store[time]) store[time] = {};
        store[time][key] = content;

        json.status = true;
        json.url = '/receive/' + key;
    }
    res.json(json);
});

app.listen(port, function () {
    console.log('app listen on', port);
});

function getkey(source) {
    return _crypto2.default.createHash('md5').update(source).digest('base64').replace(/[^\w]/g, "");
}

function getTimeID() {
    return parseInt(new Date().getTime() / 100000);
}