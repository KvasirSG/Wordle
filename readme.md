
# Wordle clone 
My own take on the Wordle game made with Angular and Python as a training project and is not meant to be "hosted" but can run locally in a development eviroment.


## Installation

### Python
1. Project runs on Python 3.11 and can be downloaded from https://www.python.org/downloads/
2. The project uses packages listed in ``requirements.txt`` and can be downloaded with:
```bash
python -m pip install -r requirements.txt
```
### Angular
1. Install Node.js version 18.14.0 LTS from https://nodejs.org/en/
2. Install Angular with npm

```bash
  npm install -g @angular/cli
```

    
## Run Locally

Clone the project

```bash
  git clone https://github.com/KvasirSG/Wordle.git
```

Go to the project directory

```bash
  cd Wordle
```

Start the API server

```bash
  python wordleAPI.py
```

Start the web server

```bash
cd worlde-app
ng serve --open
```


## API Reference

#### Make a guess

```http
  POST /guess/${word}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `word` | `string` | **Required**. Word you want to guess |

#### New game

```http
  GET /new_game
```

#### Check if a valid word


```http
  POST /is_valid_word/${word}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `word` | `string` | **Required**. Word you want to check |

#### Get the current word


```http
  GET /get_word
```

#### Get the number of guesses


```http
  GET /get_guess_count
```

#### Get Tries


```http
  GET /get_tries
```

#### Get the correct letters


```http
  GET /get_correct_letters/${word}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `word` | `string` | **Required**. Word you want to check |

#### Get the misplaced letters


```http
  GET /get_misplaced_letters/${word}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `word` | `string` | **Required**. Word you want to check |

#### Get the misplaced letters


```http
  GET /get_incorrect_letters/${word}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `word` | `string` | **Required**. Word you want to check |


## License

[MIT](https://choosealicense.com/licenses/mit/)

