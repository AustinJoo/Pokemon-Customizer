# Pokemon-Customizer
This repo holds the information for a small application that allows a user to generate customized pokemon using a menu created from gathering data from multiple external APIs. This was the result of a Hackathon event I participated in and ultimately came about from my love of the pokemon games growing up as a kid. 

The customizer is a full-stack application that connects a user client to a custom API to a PostreSQL managed database. The user client consists of multiple dropdown menus with options that were generated based on information collected from an external API. The application allows users to select a pokemon, customize the attacks that it knows, as well as the form it takes to generate, store, and render their very own creations. Once the credentials for a pokemon are selected, the information gets passed through the custom API and stored into the database. Upon having this function run, the server responds to the client with all the customized pokemon and resets the state to render every creation stored. 

The setup of the entire application is defined below.
  - Note: This application can so far work only locally so this guide will tell you how to utilize all the code locally. I am currently working on deploying the entire project and allow access from anyone
  
## Images
![Step 1](Desktop/PokemonCustomizerStep1.png)
  
## Setup
- **Dependencies**
  - React for front-end
  - Node and Express frameworks for web
  - PostgreSQL for datbase
  - [Pokeapi.co's](http://pokeapi.co) external API to populate drop-down menus with options
- **Setup steps**
 1) Install and configure [PostgreSQL](https://www.postgresql.org/download) 
 2) Install and configure [Node](https://nodejs.org/en/download/) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
 3) Run command "git clone https://github.com/AustinJoo/Pokemon-Customizer.git" at the command line
 4) Run command "cd Pokemon-Customizer) to enter the correct directory  
 5) Run command "sudo npm install" to install all dependencies
 6) Run command "npm run concurrently"
 7) Service should be running!
  
