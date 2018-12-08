# djreact

1) Cloner le projet
2) Créer un fichier .env à la racine qui contient le contenu du fichier .env.example
3) Créer votre environnement virtuel

Ouvrir le terminal 

Pour Windows : 
a) Etre à la racine du projet
b) yarn install
c) pip install virtualenv
d) cd env/Scripts/
e) Faire activate.bat ---> (un dossier env va se créer) et votre terminal sera en mode env
f) Revenir dans le dossier racine : cd ../..
g) pip install -r requirements.txt
h) Lancer le serveur back  : python manage.py runserver
i) Lancer le serveur front dans un nouveau terminal : yarn start
j) commande deactivate pour partir de l'environnement env
 
L'environnement env est un environement virtuel dédié à notre projet


4) Si vous ajouter un nouveau package pip :

pip install monPaquet
pip freeze > requirements.txt

