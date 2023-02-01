from flask import Flask , request, jsonify
from flask_restful import Resource, Api
import ast

from wordle import Wordle
app = Flask(__name__)
api = Api(app)
game = Wordle('possible_words.txt')

# api for checking if the word is correct and returning the positions of the correct letters and the misplaced letters
class CheckWord(Resource):
    def post(self, word):
        game.add_guess()
        game.tried_words.append(word)
        game.tries.append([word, game.get_correct_letters_pos(word), game.get_misplaced_letters_pos(word)])
        if game.is_valid_word(word):
            if game.check_word(word):
                return {'correct': True}, 201
            else:
                return {'correct': False, 'correct_letters': game.get_correct_letters(word),'incorrect_letters':game.get_incorrect_letters(word), 'misplaced_letters': game.get_misplaced_letters(word), 'correct_letters_pos':game.get_correct_letters_pos(word), 'misplaced_letters_pos':game.get_misplaced_letters_pos(word), 'tries': game.tries, 'guess_count':game.guess_count }, 200
        else:
            return "Is not a valid word", 400

# api for getting a new word
class NewGame(Resource):
    def get(self):
        game.set_random_word()
        game.guess_count = 0
        game.tried_words = []

        return {'word': game.word}, 200

# api for checking if the word is valid
class IsValidWord(Resource):
    def post(self, word):
        return {'valid': game.is_valid_word(word)}, 201

# api for getting the word
class GetWord(Resource):
    def get(self):
        return {'word': game.word}, 200

# api for getting the number of guesses
class GetGuessCount(Resource):
    def get(self):
        return {'guess_count': game.guess_count}, 200

class GetTriedWords(Resource):
    def get(self):
        return {'tried_words': game.tried_words}, 200

# add tried words to the tried words list
class AddTries(Resource):
    def post(self):
        content = request.json
        game.tries.append(content['tries'])
        return {'tries': game.tries}, 201

class GetTries(Resource):
    def get(self):
        return {'tries': game.tries}, 200

class resetGame(Resource):
    def get(self):
        game.reset()
        return {'word': game.word}, 200

class getCorrectLetters(Resource):
    def post(self, word):
        correct_letters = []
        for i in game.get_correct_letters(word):
            correct_letters.append(word[i])
        return {'correct_letters': correct_letters}, 201

class getMisplacedLetters(Resource):
    def post(self, word):
        misplaced_letters = []
        for i in game.get_misplaced_letters(word):
            misplaced_letters.append(word[i])
        return {'misplaced_letters': misplaced_letters}, 201

class getIncorrectLetters(Resource):
    def post(self, word):
        incorrect_letters = []
        for i in game.get_incorrect_letters(word):
            incorrect_letters.append(word[i])
        return {'incorrect_letters': incorrect_letters}, 201

api.add_resource(CheckWord, '/guess/<string:word>')
api.add_resource(NewGame, '/new_game')
api.add_resource(IsValidWord, '/is_valid_word/<string:word>')
api.add_resource(GetWord, '/get_word')
api.add_resource(GetGuessCount, '/get_guess_count')
api.add_resource(GetTries, '/get_tries')
api.add_resource(AddTries, '/add_tries')
api.add_resource(resetGame, '/new_game')
api.add_resource(getCorrectLetters, '/get_correct_letters/<string:word>')
api.add_resource(getMisplacedLetters, '/get_misplaced_letters/<string:word>')
api.add_resource(getIncorrectLetters, '/get_incorrect_letters/<string:word>')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

app.run(debug=True)
        
