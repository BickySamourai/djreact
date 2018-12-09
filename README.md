# djreact

1) Cloner le projet
2) Créer un fichier .env à la racine qui contient le contenu du fichier .env.example
3) Créer votre environnement virtuel

Ouvrir le terminal 

Pour Windows : <br/>
a) Etre à la racine du projet <br/>
b) yarn install <br/>
c) pip install virtualenv et puis faire virtualenv env <br/>
d) cd env/Scripts/ <br/>
e) Faire activate.bat ---> (un dossier env va se créer) et votre terminal sera en mode env <br/>
f) Revenir dans le dossier racine : cd ../.. <br/>
g) pip install -r requirements.txt <br/>
h) Lancer le serveur back  : python manage.py runserver <br/>
i) Lancer le serveur front dans un nouveau terminal : yarn start <br/>
j) commande deactivate pour partir de l'environnement env <br/>
 
L'environnement env est un environement virtuel dédié à notre projet <br/>


4) Si vous ajouter un nouveau package pip : <br/>

pip install monPaquet <br/>
pip freeze > requirements.txt <br/>

