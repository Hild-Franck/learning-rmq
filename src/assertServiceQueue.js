const assertServiceQueue = (channel, service) => {
	return channel.assertQueue(service)
}

module.exports = assertServiceQueue