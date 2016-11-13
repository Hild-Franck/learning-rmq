const ava = require('ava')
const connect = require('../src/connect')
const createChannel = require('../src/createChannel')
const assertQueue = require('../src/assertQueue')
const joinQueue = require('../src/joinQueue')
const getMessageOnce = require('../src/receiver/getMessageOnce')
const processMessage = require('../src/receiver/processMessage')

const url = 'localhost'
let channel = {}

ava.cb.before(t => {
	connect(url).then(conn => {
		createChannel(conn).then(ch => {
			channel = ch
			t.end()
		})
	})
})

ava.cb('queue creation', t => {
	assertQueue(channel, 'poulet').then(q => {
		t.truthy(q.queue)
		t.is(q.queue, 'poulet')
	})
	assertQueue(channel, null).then(q => {
		t.fail('we don\'t want a random queue name')
		t.end()
	}).catch(err => {
		t.pass('we don\'t want a random queue name')
		t.end()
	})
})

ava.cb('get a message once', t => {
	const queue = 'prout'
	assertQueue(channel, queue)
	getMessageOnce(channel, queue).then(msg => {
		t.truthy(msg)
		t.end()
	})
	setTimeout(() => {channel.sendToQueue(queue, new Buffer('coucou'))}, 20)
})

ava.cb('queue joining', t => {
	const queue = 'jesus'
	assertQueue(channel, queue).then(q => {
		joinQueue(channel, queue).then(() => {
			t.pass()
			t.end()
		}).catch(err => {
			t.fail()
			t.end()
		})
	})
})

ava.cb('process message', t => {
	const queue = 'promsg'
	assertQueue(channel, queue)
	processMessage(channel, queue).with(msg => {
		t.pass()
		t.end()
	}).then(ch => {
		ch.sendToQueue(queue, new Buffer('coucou'))
	})
})

