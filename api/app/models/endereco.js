/**
 * Arquivo: endereco.js
 * Author: Marcos Porto
 * Descrição: arquivo responsável pelo Schema Endereco
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function arrayLimit(val) {
    return val.length === 2;
}

const EnderecoSchema = new Schema({
    logradouro: {
      type: String,
      required: true  
    },
    numero: {
      type: String,
      required: true  
    },
    bairro: {
      type: String,
      required: true  
    },
    complemento: {
      type: String,
      required: true  
    },
    cidade: {
      type: String,
      required: true  
    },
    estado: {
      type: String,
      required: true  
    },
    pais: {
      type: String,
      required: true  
    },
    geolocalizacao: {
        type: [Number],
        required: true,
        validate: [arrayLimit, 'Geolocalização deve ter conter latitude e longitude']
    }
});

module.exports = EnderecoSchema;