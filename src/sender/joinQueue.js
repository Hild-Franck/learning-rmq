const joinQueue = (channel, q) => {
	return channel.checkQueue(q).then(() => {
		return channel.assertQueue(q)
	}).catch(err => {
		console.log(err)
		throw new Error('The queue does not exist')
	})
}

module.exports = joinQueue