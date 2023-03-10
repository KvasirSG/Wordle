import random

# class for the game
class Wordle():
    def __init__(self, words_list_file):
        
        # the file with the words
        self.words_list_file = words_list_file
        
        # the list of words
        self.words = self.get_words()
        
        # the word to guess
        self.word = self.get_random_word()
        
        # the number of guesses
        self.guess_count = 0
        
        # the list of tried words
        self.tried_words = []
        
        # the list of tries
        self.tries = []
        

    # get all the words from the file
    def get_words(self):
        with open(self.words_list_file, 'r') as f:
            words = f.readlines()
        return [word.strip() for word in words]
    
    # get a random word from the list
    def get_random_word(self):
        return random.choice(self.words)
    
    # set a random word
    def set_random_word(self):
        self.word = self.get_random_word()

    # check if the word is correct
    def check_word(self, word):
        return word == self.word
            
    # return the positions of the correct letters
    def get_correct_letters_pos(self, word):
        correct_letters_pos = []
        for i in range(len(self.word)):
            if self.word[i] == word[i]:
                correct_letters_pos.append(i)
        return correct_letters_pos

    # return the positions of the incorrect letters
    def get_incorrect_letters_pos(self, word):
        incorrect_letters_pos = []
        for i in range(len(self.word)):
            if self.word[i] != word[i]:
                incorrect_letters_pos.append(i)
        return incorrect_letters_pos

    # return the positions of the letters that are in the word but in the wrong position
    def get_misplaced_letters_pos(self, word):
        misplaced_letters_pos = []
        for i in range(len(self.word)):
            if self.word[i] != word[i] and word[i] in self.word:
                misplaced_letters_pos.append(i)
        return misplaced_letters_pos

    # return the correct letters
    def get_correct_letters(self, word):
        correct_letters = []
        for i in range(len(self.word)):
            if self.word[i] == word[i]:
                correct_letters.append(word[i])
        return correct_letters
    
    # return the incorrect letters
    def get_incorrect_letters(self, word):
        incorrect_letters = []
        for i in range(len(self.word)):
            if self.word[i] != word[i]:
                incorrect_letters.append(word[i])
        return incorrect_letters

    # return the letters that are in the word but in the wrong position
    def get_misplaced_letters(self, word):
        misplaced_letters = []
        for i in range(len(self.word)):
            if self.word[i] != word[i] and word[i] in self.word:
                misplaced_letters.append(word[i])
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

    # add try to tries
    def add_try(self, wordcheck):
        self.tries.append(wordcheck)
    
    # reset the game
    def reset(self):
        self.word = self.get_random_word()
        self.guess_count = 0
        self.tried_words = []