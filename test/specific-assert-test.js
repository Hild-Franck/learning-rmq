const ava = require('ava')

const connect = require('../src/connect')
const createChannel = require('../src/createChannel')
const assertAppQueue = require('../src/assertAppQueue')
const assertServiceExchange = require('../src/assertServiceExchange')
const assertServiceQueue = require('../src/assertServiceQueue')

const url = 'localhost'
const service = 'service_name'
let channel = {}

ava.cb.before(t => {
	connect(url).then(conn => {
		createChannel(conn).then(ch => {
			channel = ch
			t.end()
		})
	})
})

ava.cb('app queue creation', t => {
	assertAppQueue(channel).then(q => {
		t.truthy(/^amq.gen/.test(q.queue))
		t.end()
	})
})

ava.cb('service exchange creation', t => {
	assertAppQueue(channel).then(q => {
		assertServiceExchange(channel, q.queue, service).then(res => {
			t.is(res.constructor, Object)
			t.end()
		})
	})
})

ava.cb('service queue creation', t => {
	assertServiceQueue(channel, service).then(q => {
		t.is(q.queue, service)
		t.end()
	})
})