const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

app.get('/home', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.render('home');
});
app.get('/info', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.render('info');
});
app.get('/guidelines', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.render('guidelines');
});
app.get('/lectures', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.render('lectures');
});
app.get('/community', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.render('community');
});
    
//ejs 렌더링 테스트
app.get('/carList', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    
    /*res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>home page</h1>');
    res.end();*/
    
    /*fs.readFile('./views/home.ejs', 'utf8', function(error, data) {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(ejs.render(data,{cars:[{name:'SM3',price:2000,year:1999,company:'SAMSUNG'},{name:'SM9',price:6000,year:2013,company:'SAMSUNG'}]}));
    });  */
    
    var context = {cars:[{name:'SM3',price:2000,year:1999,company:'SAMSUNG'},{name:'SM9',price:6000,year:2013,company:'SAMSUNG'}]};
    //res.render('home', context)
    //res.render('home', context, function(err, html){
    //app.render('home', context, function(err, html){
    req.app.render('carList', context, function(err, html){
        if(err) {
            console.log('뷰 렌더링 중 오류 발생:', err.stack);
            return;
        }
        
        console.log('2 >>>>>>> rendered:', html);
        res.end(html);
    });
   
});

exports.app = functions.https.onRequest(app);