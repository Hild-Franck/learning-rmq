// This one can be tricky. Hold on.
const connect = require('../connect')
const createChannel = require('../createChannel')
const assertQueue = require('../assertQueue')

// A fully functionnal receiver. Just give
// him an url and a queue, provide an handler
// and then expose the channel he creates !
const workIn = (url, queue) => {
	let handler = _ => _

	const ret = {
		with: fn => {
// wow much promise so async many chains
			return connect(url).then(conn => {
				return createChannel(conn)
			}).then(ch => {
				workIn.channel = ch
				return assertQueue(ch, queue)
			}).then(q => {
				workIn.channel.consume(q.queue, msg => {
					handler(msg)
				}, { noAck: true })
				handler = fn
				return Promise.resolve(workIn.channel)
			})
		}
	}

	return ret
}

module.exports = workIn
