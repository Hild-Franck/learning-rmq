/**
 * @example processMessage(ch, q).with(msg => console.log(msg)).then(/.../)
 **/
const processMessage = (channel, queue) => {
// On définit un handler, qui traitera le message (une callback
// en somme)
	let handler = _ => _
// On définit un objet dont la propriété with permet de
// définir le handler dans la closure
	const ret = {
		with: fn => {
// Ici, on définit le handler custom
			handler = fn
// On return un Promise.resolve() pour pouvoir chain
// avec un then()
			return Promise.resolve()
		}
	}
// Lorsqu'un reçoit un message de la queue,
// on le traite avec le handler
	channel.consume(queue, msg => {
		handler(msg)
	}, { noAck: true })

	return ret
}

module.exports = processMessage
