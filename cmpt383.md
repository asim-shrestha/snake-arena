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
1. <b>Javascript</b>: The front end of the project and will be powered by React and React Bootstrap. This is where game creation and game configuration logic will reside. The front end will also house a leaderboard page from data retrieved through the back end.
2. <b>Python</b>: The back end of the project, powered by FastAPI and socketIO. Will host and run snake games and return results to the front end. Will also be used to persistently store snake data with SQLite. 
3. <b>GoLang</b>: Will house all of the AI snake algorithms and will be called through Python. Makes heavy use of Go structs.

## Inter-Language communication methods
There are 3 ways in which languages communicate with each other within this app.
1. A socketIO client / server web socket connection. This is used in order to stream real time game information between the client (JavaScript) and server (Python). When a game is started, the server will place clients in their own rooms and serve them asynchronously. This means that you can have multiple tabs open and play different games concurrently without any issues. The game operates on frame intervals. At each interval, the socket server will see what the user has input if a user snake exists, figure out AI moves if they exist, and then send the game state to the client. Meanwhile, the client is free to send key presses indicating the player snake direction at any time.
2. A python FastAPI REST server that integrates with SQLite in order to store data for a player snake leaderboard. Whenever a player snake finishes a game, he is either inserted into the leaderboard or has their leaderboard values updated through the socket backend. The interface to make crud operations however is exposed through this rest server. Then when the client visits the leaderboard page, they make a get request to this server and is sent back the leaderboard information. For convenience, the database will come with pre-existing data. 
3. A foreign function interface in which GoLang code that facilitates AI snake movement algorithms will be called through the Python backend. The Go code is compiled into a shared C library in which python is able to call it through the ctypes package. In order to pass data back and forth between the two langagues, each language will both serialize game state data into a string when sending data and deserialize when recieving data.

## Deployment
This project will be deployed through the use of Docker containers. Run the command below to deploy. Currently, running this will just display hello world through both JavaScript and Python but in the future will open up the web servers. A C++ hello world is not displayed as there will be no container for C++.
> $`docker-compose up`

>Travel to http://localhost:3000/ on your web browser

>Travel to http://localhost:5000/ on your web browser to see the complete Rest API documentation
