const express = require('express');
const router = express.Router();
const db = require('../database/mysql');
const app = express();
app.use(express.json());
const nodemailer = require('nodemailer');   


