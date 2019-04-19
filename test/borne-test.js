var assert = require('chai').assert
const sinon = require('sinon');
var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('supertest');
chai.use(chaiHttp);
var spy = sinon.spy();
let should = chai.should();

describe('Testing les-indecis-borne', function() {
	describe('loading express', function () {
		var app;
		before(function () {
			app = require('../borne.js');
		});
		after(function (){
			process.exit();
		});
		
		it('isRespondingCorrectly',(done) => {
			this.timeout(10000);
			chai.request(app).get('/').end((err,res) => {
				res.should.have.status(200)
				res.text.should.be.a('string')
				res.text.should.be.eql('You are connected on CSC AP')
				done();
			});
		});
		
		it('isCheckingCorrectly',(done) => {
			this.timeout(10000);
			chai.request(app).get('/check').end((err,res) => {
				res.should.have.status(200)
				res.text.should.be.a('string')
				res.text.should.be.eql('connected_to_csc_access_point')
				done();
			});
		});
		
		it('isListingCorrectly',(done) => {
			this.timeout(10000);
			chai.request(app).get('/list').end((err,res) => {
				res.should.have.status(200)
				res.text.should.be.a('string')
				var l = JSON.parse(res.text)
				assert.notEqual(l.length, 0);
				done();
			});
		});
	});
});