Bonjour chers amis cambrioleurs ! 

Le plan est simple, vous devez télécharger le projet via github et installer les dépendances avec: "npm install".

Lancez l'api avec node app.js et envoyez une requete http, avec dans le body un fichier .csv des objets à voler en indiquant le prix et le poid. 

En paramètre de cette requête indiquez le point maximum que vous pouvez transporter, il vous sera répondu quel(s) objet(s) doit(doivent) être dérobé(s) en priorité !

curl --location --request POST 'http://localhost:9000/robberyOptimization?kg=100' \
--form 'file=@"/home/etudiant/Téléchargements/Listing-Objets.csv"'