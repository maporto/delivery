var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Delivery = require('./app/models/delivery');
var handler = require('./app/helpers/errorHandler');
var cors = require('cors')
mongoose.Promise = global.Promise;

//URI: Local
mongoose.connect('mongodb://localhost:27017/routeasy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Configuração da variável app para usar o 'bodyParser()':
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//Definindo a porta onde será executada a nossa api:
var port = process.env.port || 8000;

// Criando uma instância das Rotas via Express:
var router = express.Router();

//API's:
//Rotas que terminarem com '/deliveries' (servir: GET ALL & POST)
router.route('/deliveries').post(function(req, res) {
    var delivery = new Delivery(req.body);

    delivery.save(function(error) {
        if(error) return handler(res, error);
        res.status(201);
        return res.json(delivery);
    });
}).get(function(req, res) {
    Delivery.find(function(error, deliveries) {
        if(error) return handler(res, error);
        return res.json(deliveries);
    });
}).delete(function(req, res) {
    Delivery.deleteMany({}, function(error, deliveries) {
        if(error) return handler(res, error);
        return res.json(deliveries);
    });
});
//Rotas que terminarem com '/deliveries/:delivery_id' (servir: DELETE)
router.route('/deliveries/:delivery_id').delete(function(req, res) {
    Delivery.deleteOne({
        _id: req.params.delivery_id
        }, function(error) {
            if(error) return handler(res, error);
            res.status(204);
            return res.json({message: 'Delivery Excluído com Sucesso!' });
        });
    }
);

//Definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);