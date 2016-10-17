const joinQueue = (channel, q) =>
	new Promise((resolve, reject) => {
// Cet event permet de gérer l'exeption jetée lorsque
// checkQueue voit que la queue n'existe pas (cancer)
		channel.on('error', err => {
			reject(new Error('The queue does not exist'))
		})
// Si la queue existe, en revanche, on l'expose
		channel.checkQueue(q).then(() => {
			return channel.assertQueue(q).then(resolve)
// Ce catch là permet au process d'ignorer l'error levée
// par l'exeption au dessus (puisque qu'on gère déjà l'exeption)
		}).catch(err => {})
	})

module.exports = joinQueue