let channelOpened = false

const createChannel = conn => {
// On vérifie que le channel n'a pas déjà été ouvert
	if(!channelOpened) {
		return conn.createChannel().then(ch => {
			channelOpened = true
			return ch
		})
	}
	return Promise.reject(new Error('A channel is already opened'))
}



module.exports = createChannel