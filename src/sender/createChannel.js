let channelOpened = false

const createChannel = conn => {
	if(!channelOpened) {
		return conn.createChannel().then(ch => {
			channelOpened = true
			return ch
		})
	}
	return Promise.reject(new Error('A channel is already opened'))
}



module.exports = createChannel