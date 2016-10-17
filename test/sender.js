const ava = require('ava')
const connect = require('../src/sender/connect')
const createChannel = require('../src/sender/createChannel')
const assertQueue = require('../src/sender/assertQueue')
const joinQueue = require('../src/sender/joinQueue')

const url = 'localhost'

ava.cb('connection', t => {
	connect(url).then(conn => {
		t.is(conn.constructor.name, 'ChannelModel')
		t.end()
	}).catch(err => {
		t.fail()
	})
})

ava.cb('channel creation', t => {
	connect(url).then(conn => {
		createChannel(conn).then(ch => {
			t.is(ch.constructor.name, 'Channel', 'channel created')
		}).then(_ => {
			createChannel(conn).then(_ => {
				t.fail('more than one channel created')
				t.end()
			}).catch(err => {
				t.pass('only one channel created')
				t.end()
			})
		})
		
	})
})

ava.cb('queue creation', t => {
	connect(url).then(conn => {
		createChannel(conn).then(ch => {
			assertQueue(ch, 'poulet').then(q => {
				t.truthy(q.queue)
				t.is(q.queue, 'poulet')
			})
			assertQueue(ch, null).then(q => {
				t.fail('we don\'t want a random queue name')
				t.end()
			}).catch(err => {
				t.pass('we don\'t want a random queue name')
				t.end()
			})
		})
	})
})

ava.cb('queue joining', t => {
	connect(url).then(conn => {
		createChannel(conn).then(ch => {
			assertQueue(ch, 'jesus').then(q => {
				joinQueue(ch, 'jesus').then(() => {
					t.pass()
					t.end()
				}).catch(err => {
					t.fail('you can only join existing queue')
					t.end()
				})
			})
		})
	})
})