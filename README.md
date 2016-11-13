# Learning RMQ
>**Note:** Il est indispensable d'installer un serveur rabbitmq sur sa machine. Pour ça, google est ton ami ! (non mais sérieux, c'est easy)

>**Note 2:** Il faut aussi travailler avec la reference API de amqplib: [ICI](http://www.squaremobius.net/amqp.node/)

## Le principe simple
Le principe de rabbitMQ est de fournir un système de messaging (ou d'échange de messages) dans divers protocole. Ici, nous allons utiliser el protocole AMQ.
Voilà le modèle le plus simple pour le représenter:

**SENDER -> QUEUE -> RECEIVER**

> **Explications:**
> Le **receiver** s'abonne et écoute une queue. Lorsque un message se stack dans la queue, le serveur rabbitmq l'envoie à tout les receiver qui écoutent cette queue.
> Le **sender** lui, se contente d'ajouter un message dans la queue.

###Code commun
Le code exprimant ce principe est éclaté en plusieurs modules, sont basés sur les promesses et l'asynchrone. Voici la liste des modules utiles ici:
>- **connect.js:** permet de se connecter au serveur rabbitmq. Expose un objet *connection*.
>- **createChannel:** permet de créer un canal de communication avec le serveur ; la connection seule ne suffit pas pour communiquer. Expose un objet *channel*
>- **assertQueue:** permet de créer et se connecter une queue sur le serveur si elle n'existe pas, ou de s'y connecter simplement si elle existe déjà. Expose la *queue* créée / rejointe
>- **joinQueue:** permet de rejoindre une queue seulement si elle existe déjà. De même, expose la *queue* rejointe.
>- **assertAppQueue:** créé la queue propre à l'instance actuelle du service. Expose la queue, générée aléatoirement par le serveur RabbitMQ
>- **assertServiceExchange:** rejoint l'exchange commun des instances du même service. Tout les messages envoyés a cet exchange seront reçus par toutes les instances du même service.
>- **assertServiceQueue:** rejoint la queue commune des instances du même service. Tout les messages envoyés a cette queue seront reçus par une instances du service par load balancing

Ces modules sont essentiels à la fois pour le sender ET le receiver. Mais comme dit plus haut, chacun a un rôle différent, il faut donc préparer des modules spécifiques à chacun.

###Le receiver
On va donc s'atteler à lui faire écouter les queues dans lesquelles on va envoyer des messages:
>- **getMessageOnce:** permet de ne recevoir qu'un message en provenance de la queue, puis de la fermer.
>- **processMessage:** permet d'écouter une queue et d'y appliquer un handler que l'on aura défini.
>- **workIn:** permet de définir un handler dans la méthode with() exposée pour gérer les messages de la queue définie en paramètre.

###Le sender
Pour le sender, on va utiliser l'API de *amqplib* sendToQueue, et ne pas écrire une sur-couche
>- **sendToQueue:** permet d'envoyer un message dans la queue

###Objectif
Il va falloir que tout les tests passent au vert ! Le but est de regarder le code, puis de tout supprimer sauf la signature des fonctions et tout réécrire.
GL&HF

Tout est commenté, il faut en profiter !