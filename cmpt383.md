# The Polyglot
The final project for CMPT383 by Asim Shrestha.

## Topic Idea
This project is called <b>Snake Arena</b> and is inspired by [BattleSnake](https://play.battlesnake.com/), an online AI competition in which you create your own snake AI to battle other AI's. This project is a web app and serves as both a stand alone game of snake in which you battle amongst AI's and as a testing ground to build the best snake AI for future battle snake tournaments. The rules of the game and how to play may be confusing at first. Luckily, there is a tutorial modal that opens right when you visit the website! Please get a good read through of the modal prior to playing. 

### Prominent Inclusions:
- Ability to manually control a snake yourself and play against AI snakes.
- Contains pre-built snake AI's that use DFS + heuristics to most optimally survive.
- Ability to configure your own AI battlesnake through adjusting what the snake prioritizes. This can be done with the "Smart Snake" type. 
- Ability to add and remove custom and pre-built snakes onto a game.
- Ability to configure arena options such as grid size, food spawn rate, and map type.
- Will house a leaderboard of the players.

## Languages and roles
1. <b>Javascript</b>: The front end of the project and will be powered by React. This is where game creation and game configuration logic will reside. The front end will also house a leaderboard page from data retrieved through the back end.
2. <b>Python</b>: The back end of the project, powered by FastAPI and socketIO. Will host and run snake games and return results to the front end. Will also be used to persistently store snake data with SQLite. 
3. <b>GoLang</b>: Will house all of the AI snake algorithms and will be called through Python. Makes heavy use of Go structs.

## Inter-Language communication methods
1. A foreign function interface in which C++ code to control snake movement will be called through the Python backend. How exactly the two will interface has not been decided. (Maybe SWIG)
2. A python REST server in which the JavaScript front end will send game configuration information and recieve back game information.

## Deployment
This project will be deployed through the use of Docker containers. Run the command below to deploy. Currently, running this will just display hello world through both JavaScript and Python but in the future will open up the web servers. A C++ hello world is not displayed as there will be no container for C++.
> $`docker-compose up`

>Travel to http://localhost:3000/ on your web browser

>Travel to http://localhost:5000/ on your web browser to see the complete Rest API documentation
