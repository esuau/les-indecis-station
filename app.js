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
})

app.get('/list',(request,response) => {
	response.send(msg);
})

app.listen(port, (err) => {
	if(err) {
		return console.log('Unexpected error');
	}
	console.log('server is listeing on port 8080');
});
