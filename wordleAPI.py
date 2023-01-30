from flask import Flask
from flask_restful import Resource, Api
import ast

from wordle import Wordle
app = Flask(__name__)
api = Api(app)
game = Wordle('possible_words.txt')

# api for checking if the word is correct and returning the positions of the correct letters and the misplaced letters
class CheckWord(Resource):
    def get(self, word):
        game.add_guess()
        if game.is_valid_word(word):
            if game.check_word(word):
                return {'correct': True}, 200
            else:
                return {'correct': False, 'correct_letters': game.get_correct_letters(word), 'misplaced_letters': game.get_misplaced_letters(word)}, 200
        else:
            return "Is not a valid word", 400

# api for getting a new word
class NewGame(Resource):
    def get(self):
        game.set_random_word()
        game.guess_count = 0

        return {'word': game.word}, 200

# api for checking if the word is valid
class IsValidWord(Resource):
    def get(self, word):
        return {'valid': game.is_valid_word(word)}, 200

# api for getting the word
class GetWord(Resource):
    def get(self):
        return {'word': game.word}, 200

# api for getting the number of guesses
class GetGuessCount(Resource):
    def get(self):
        return {'guess_count': game.guess_count}, 200

api.add_resource(CheckWord, '/guess/<string:word>')
api.add_resource(NewGame, '/new_game')
api.add_resource(IsValidWord, '/is_valid_word/<string:word>')
api.add_resource(GetWord, '/get_word')
api.add_resource(GetGuessCount, '/get_guess_count')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

app.run(debug=True)
        
