import crypto from 'crypto'
import express from 'express'
import bodyParser from 'body-parser'
import pug from 'pug'

const port = process.env.PORT || 4000
const app = express()

let store = {}

app.use(express.static(__dirname + './../static'))
app.engine('pug', pug.__express)
app.use(bodyParser.urlencoded())

app.get('/', function(req, res) {
    res.render('index.pug')
})

app.get('/receive/:md5', function(req, res) {
    const time = getTimeID()
    const key = req.params.md5
    if (store[time] && store[time].hasOwnProperty(key)) {
        res.send('receive.pug', {content: store[time][key]})
    }
    res.render('receive.pug', {content: 'Timeout or nothing.'})
})

app.post('/send', function(req, res) {
    const time = getTimeID()
    const content = req.body.content

    let json = {status: false}
    if (content.length <= 600) {
        const contentMd5 = md5(content)
        if (!store[time]) store[time] = {};
        store[time][contentMd5] = content

        json.status = true
        json.url = '/receive/' + contentMd5
    }
    res.json(json)
})

app.listen(port, function(){
    console.log('app listen on', port)
})

function md5(source) {
    return crypto.createHash('md5').update(source).digest('base64')
}

function getTimeID() {
    return parseInt(new Date().getTime() / 100000)
}
