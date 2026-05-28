const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');

const index = fs.readFileSync('./index.html', 'utf-8');
// const favicon = fs.readFileSync('./favicon.ico');
const app = express();

let privateKey; 
let certificate;
let ca;
let credentials;
if  (fs.existsSync('./certs/mi2025.key')) {
  privateKey  = fs.readFileSync('./certs/mi2025.key', 'utf-8');
  certificate = fs.readFileSync('./certs/moreinformatics_com.crt', 'utf-8');
  ca = fs.readFileSync('./certs/moreinformatics_com.ca-bundle', 'utf-8')
  credentials = {key: privateKey, cert: certificate, ca: ca};
}

/*
app.get(['/favicon.ico'], (req, res) => {
  res.send(favicon);
});
*/

app.get(['/', '/index.html'], (req, res) => {
    res.send(index);
});


var httpServer = http.createServer(app);
let httpsServer;
if (credentials) {
  httpsServer = https.createServer(credentials, app);
}

httpServer.listen(80);
if (httpsServer) {
  httpsServer.listen(443);
  console.log('listening on HTTP and HTTPS...')
}
else console.log('HTTPS server not running...')