const ava = require('ava')

const workIn = require('../src/receiver/workIn.js')

const url = 'localhost'
const queue = 'workerQueue'

ava.cb('plain worker', t => {
	workIn(url, queue).with(msg => {
		t.pass()
		t.end()
	}).then(ch => {
		ch.sendToQueue(queue, new Buffer('I hope I will pass !'))
	})
})