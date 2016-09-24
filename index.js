"use strict";

const express = require('express')

const port = process.env.PORT || 3000
const app = express()

app.get('/', function(req, res) {
    res.send('Hello world')
})
app.listen(port, function(){
    console.log('app listen on 80')
})
