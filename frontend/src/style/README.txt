CHANGEMENT DE SAISON:

/////////////////////////////////////////////////////////////////////

- remettre les fichiers suivants dans la saison passée:
    * ah_logo
    * ah_title
    * header_bg
  et déplacer ces memes fichiers de la saison en cours

/////////////////////////////////////////////////////////////////////

- fichier "frontend/src/style/utilities/mixins", en bas de page:
  modifier le nom de la saison pour:
  * "standard-btn"
  * "body-background"

commande simple: 

Passage hiver => printemps
cd ~/Projects/training_web/asylum_heroes/frontend/src/img/ && mv ah_logo.png ah_title.png header_bg.png ./winter/ && mv ./spring/* ./

Passage printemps => été
cd ~/Projects/training_web/asylum_heroes/frontend/src/img/ && mv ah_logo.png ah_title.png header_bg.png ./spring/ && mv ./summer/* ./

Passage été => automne
cd ~/Projects/training_web/asylum_heroes/frontend/src/img/ && mv ah_logo.png ah_title.png header_bg.png ./summer/ && mv ./fall/* ./

Passage automne => hiver
cd ~/Projects/training_web/asylum_heroes/frontend/src/img/ && mv ah_logo.png ah_title.png header_bg.png ./fall/ && mv ./winter/* ./