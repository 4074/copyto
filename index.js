"use strict";

const express = require('express')

const app = express()

app.get('/', function(req, res) {
    res.send('Hello world')
})
app.listen(80, function(){
    console.log('app listen on 80')
})
