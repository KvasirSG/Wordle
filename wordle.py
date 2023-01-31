import random

class Wordle():
    def __init__(self, words_list_file):
        self.words_list_file = words_list_file
        self.words = self.get_words()
        self.word = self.get_random_word()
        self.guess_count = 0
        self.tried_words = []
        

    # get all the words from the file
    def get_words(self):
        with open(self.words_list_file, 'r') as f:
            words = f.readlines()
        return [word.strip() for word in words]
    
    def get_random_word(self):
        return random.choice(self.words)
    
    def set_random_word(self):
        self.word = self.get_random_word()

    # check if the word is correct
    def check_word(self, word):
        return word == self.word
            
    # return the positions of the correct letters
    def get_correct_letters(self, word):
        correct_letters = []
        for i in range(len(self.word)):
            if self.word[i] == word[i]:
                correct_letters.append(i)
        return correct_letters

    # return the positions of the incorrect letters
    def get_incorrect_letters(self, word):
        incorrect_letters = []
        for i in range(len(self.word)):
            if self.word[i] != word[i]:
                incorrect_letters.append(i)
        return incorrect_letters

    # return the positions of the letters that are in the word but in the wrong position
    def get_misplaced_letters(self, word):
        misplaced_letters = []
        for i in range(len(self.word)):
            if self.word[i] != word[i] and word[i] in self.word:
                misplaced_letters.append(i)
        return misplaced_letters

    # check if it's a valid word
    def is_valid_word(self, word):
        return word in self.words
    
    # add guess to guess count
    def add_guess(self):
        self.guess_count += 1
    
    # check if the word has been tried before
    def is_tried_word(self, word):
        return word in self.tried_words
    
    # add word to tried words
    def add_tried_word(self, word):
        self.tried_words.append(word)
    
    # reset the game
    def reset(self):
        self.word = self.get_random_word()
        self.guess_count = 0
        self.tried_words = []