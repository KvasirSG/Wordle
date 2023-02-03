Wordle clone af New York Times spil Wordle som er en afart af mastermind dog med org og bogstaver

## Indhold

- [[Intro Project - Wordle#Forudsætninger |Forudsætninger ]]
	- [[Intro Project - Wordle#Python|Python]]
	- [[#Python Packages]]
		- [[#Flask]]
	- [[#Node.js]]
		- [[#Angular]]
- [[#Design tankegang]]
- [[#API Documentation]]

## Forudsætninger

### Python 
Projektet kører på python 3.11 som kan downloades fra https://www.python.org/downloads/

#### Python Packages
Projektet indeholder en `requirements.txt` fil som kan hente alle brugte pakker med kommand
`python -m pip install -r requirements.txt`' fra projekt mappen. Nedenunder er den package som er brugt til Python delen af projektet. Herefter kan projektet køres fra kommand `python wordleAPI.py`

##### Flask
Flask er et Python-framework, der kan tilpasses, og som giver udviklere fuld kontrol over, hvordan brugerne får adgang til data. Flask er et "micro-framework" baseret på Werkzeugs WSGI-værktøjssæt og Jinja 2's templating-motor. Det er designet som en webramme til udvikling af RESTful API'er.

### Node.js
Projektet's frontend kører på node.js 18.14.0 LTS som kan downloades fra https://nodejs.org/en/

### Angular
Angular er en TypeScript-baseret, gratis og open source framework for webapplikationer, der ledes af Angular-teamet hos Google og af et fællesskab af enkeltpersoner og virksomheder.

Projektet's frontend bruger angular og Angular kan installeres fra command
`npm install -g @angular/cli`

herefter naviger til projekt mappens `/worlde-app` og kør kommandoen `npm install` efterfuldt af `ng serve --open`

## Design tankegang
Tankegangen bag projektet var er opdele de enkelte dele af projektet op så man kan kan lave forskellige brugerflade løsninger. 
Dette bliver gjort ved at spillet har sin egen klasse og kan ved hjælp af den klasse kan køre som en console application som eksempel.
I min løsning er game mechanics klassen sat ind i en API så man kan tilgå spillets informationer fra HTTP requests. Dette gør det muligt at udvikle brugerflader i adskillige web frameworks, eller mobile application udvikling. I min løsning bruger jeg Angular men man kan sagtens uden at ændre selve spille koden eller API'en lave en brugerflade løsning i React eller java for android. 

## API Documentation

- Make a guess: ``POST /guess/<string:word>
- Request new game: `GET /new_game`
- Check if a valid word: `POST /is_valid_word/<string:word>
- Get the current word: `GET /get_word`
- Get the number of guesses: `GET /get_guess_count`
- Get Tries: `GET /get_tries`
- Get the correct letters: `GET /get_correct_letters/<string:word>`
- Get the misplaced letters: `GET /get_misplaced_letters/<string:word>`
- Get the incorrect letters: `GET /get_incorrect_letters/<string:word>`



