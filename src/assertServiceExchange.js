const assertServiceExchange = (channel, q, service) => {
	return channel.assertExchange(service, 'fanout').then(ex => {
		return channel.bindQueue(q, service, '')
	})
}

module.exports = assertServiceExchange