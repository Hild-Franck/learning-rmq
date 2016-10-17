let msgRecieved = false

const getMessageOnce = (channel, queue) =>
	new Promise((resolve, reject) => {
		channel.consume(queue, msg => {
// On vérifie que l'on a pas déjà reçu un message
// (dans le cas où on en reçoit plus avant de supprimer la queue)
			if (!msgRecieved) {
				msgRecieved = true
				channel.deleteQueue(queue)
				return resolve(msg)
			}
			return reject(new Error('You already received a message'))
// L'option noAck permet de dire au serveur que l'on n'enverra
// pas de message de confirmation (ack(msg)) lorsqu'on reçoit un message
// Sinon, le serveur stack les messages n'ayant pas reçu de confirmation
		}, { noAck: true })
	})

module.exports = getMessageOnce