var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var services = require('./javascripts/services');
var repositories = require('./javascripts/repositories');
var routes = require('./javascripts/routes');

var sellers = new repositories.Sellers();
var sellerService = new services.SellerService(sellers);
var orderService = new services.OrderService();
var dispatcher = new services.Dispatcher(sellerService, orderService);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes(sellerService, dispatcher));
app.use(express.static(path.join(__dirname, 'public')));

dispatcher.startBuying(1);

module.exports = app;
