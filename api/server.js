var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Delivery = require('./app/models/delivery');
mongoose.Promise = global.Promise;

//URI: Local
mongoose.connect('mongodb://localhost:27017/routeasy', {
    useMongoClient: true
});

//Configuração da variável app para usar o 'bodyParser()':
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde será executada a nossa api:
var port = process.env.port || 8000;

// Criando uma instância das Rotas via Express:
var router = express.Router();

//API's:
//Rotas que terminarem com '/deliveries' (servir: GET ALL & POST)
router.route('/deliveries').post(function(req, res) {
    var delivery = new Delivery(req.body);

    delivery.save(function(error) {
        if(error)
            res.json(error);

        res.status(201);
        res.json(delivery);
    });
}).get(function(req, res) {
    Delivery.find(function(error, deliveries) {
        if(error)
            res.json(error);

        res.json(deliveries);
    });
});
//Rotas que terminarem com '/deliveries/:delivery_id' (servir: DELETE)
router.route('/deliveries/:delivery_id').delete(function(req, res) {
    Delivery.remove({
        _id: req.params.delivery_id
        }, function(error) {
            if (error) 
                res.json(error);

            res.status(204);
            res.json({message: 'Delivery Excluído com Sucesso!' });
        });
    }
);

//Definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);