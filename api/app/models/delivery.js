/**
 * Arquivo: delivery.js
 * Author: Marcos Porto
 * Descrição: arquivo responsável pelo Modelo de  Delivery
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EnderecoSchema = require('./endereco');

var DeliverySchema = new Schema({
    cliente: {
        type: String,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    endereco: {
        type: EnderecoSchema,
        required: true
    },
});

const Delivery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delivery;