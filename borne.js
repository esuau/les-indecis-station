const express = require('express')
const port=8080
const app= express()
const request = require('request')
var msg = "";

request('http://backend.undefined.inside.esiag.info/get_vehicles', {json:false}, (err, res, body) => {
	if(err) { return console.log(err);}
	msg = body ;
});

const requestHandler = (request,response) => {
	response.end(msg);
}

app.get('/',(request,response) => {
	response.send('You are connected on CSC AP');
	console.log("connected client query on /")
});

app.get('/list',(request,response) => {
	request('http://backend.undefined.inside.esiag.info/get_vehicles', {json:false}, (err, res, body) => {
		if(err) { return console.log(err);}
		msg = body ;
		response.send(msg);
		console.log("connected client query on /list")
	});
});

app.get('/check',(request,response) => {
	response.send('connected_to_csc_access_point');
	console.log("connected client query on /check")
});

app.listen(port, (err) => {
	if(err) {
		return console.log('Unexpected error');
	}
	console.log('server is listeing on port 8080');
});

module.exports = app