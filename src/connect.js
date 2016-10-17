const amqp = require('amqplib')

const connect = url =>
	amqp.connect('amqp://' + url)

module.exports = connect