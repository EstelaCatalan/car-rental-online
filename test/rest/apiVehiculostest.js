const chai = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const CarRentalOnline = require("../../src/model/car-rental-online");


chai.use(supertest);

const URL = 'http://localhost:3000'; 

