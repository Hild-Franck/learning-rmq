const ava = require('ava')
const connect = require('../src/connect')
const createChannel = require('../src/createChannel')

const url = 'localhost'


ava('connection', t => {
	connect(url).then(conn => {
		t.is(conn.constructor.name, 'ChannelModel')
		t.end()
	}).catch(err => {
		t.fail()
	})
})

ava('channel creation', t => {
	connect(url).then(conn => {
		createChannel(conn).then(ch => {
			t.is(ch.constructor.name, 'Channel', 'channel created')
		}).then(_ => {
			createChannel(conn).then(_ => {
				t.fail('more than one channel created')
				t.end()
			}).catch(err => {
				ch.close().catch(() => {})
				t.pass('only one channel created')
				t.end()
			})
		})
	})
})