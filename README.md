# djreact

1) Cloner le projet
2) Créer un fichier .env à la racine qui contient le contenu du fichier .env.example
3) Créer votre environnement virtuel

Ouvrir le terminal 

Pour Windows : 
Etre à la racine du projet
yarn install
pip install virtualenv
cd env/Scripts/
Faire activate.bat ---> (un dossier env va se créer) et votre terminal sera en mode env
Revenir dans le dossier racine : cd ../..
pip install -r requirements.txt
Lancer le serveur back  : python manage.py runserver
Lancer le serveur front dans un nouveau terminal : yarn start
commande deactivate pour partir de l'environnement env
 
L'environnement env est un environement virtuel dédié à notre projet


4) Si vous ajouter un nouveau package pip :

pip install monPaquet
pip freeze > requirements.txt

