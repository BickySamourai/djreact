# djreact

1) Cloner le projet
2) Créer un fichier .env à la racine qui contient le contenu du fichier .env.example
3) Créer votre environnement virtuel

Ouvrir le terminal 

Pour Windows : 
1) Etre à la racine du projet
2) yarn install
3) pip install virtualenv
4) cd env/Scripts/
5) Faire activate.bat ---> (un dossier env va se créer) et votre terminal sera en mode env
6) Revenir dans le dossier racine : cd ../..
7) pip install -r requirements.txt
8) Lancer le serveur back  : python manage.py runserver
9) Lancer le serveur front dans un nouveau terminal : yarn start
10) commande deactivate pour partir de l'environnement env
 
L'environnement env est un environement virtuel dédié à notre projet


4) Si vous ajouter un nouveau package pip :

pip install monPaquet <br/>
pip freeze > requirements.txt

