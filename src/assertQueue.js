const assertQueue = (channel, q) => {
// On vérifie que la queue est bien une string
	if(q && q.constructor.name === 'String')
		return channel.assertQueue(q)
	return Promise.reject(new Error('If no string provided, the queue name is random'))
}

module.exports = assertQueue