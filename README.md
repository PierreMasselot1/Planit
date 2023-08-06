# RainBump

The goal of this project is to familiarize myself with the development of a cross-platform application

Refer to the project board for current goals and feature priorities: https://github.com/users/PierreMasselot1/projects/1
# web
The web app is made up of three main components, the database, the frontend and the backend.
To run those in a dev environment do the following:
## Requirements
* The minimum requirement is having [docker](https://www.docker.com/products/docker-desktop) installed locally.
* Ideally >8Gb of RAM
* If you also want to run everything locally you will need

`node v14.17.0 or higher`

`npm v6.14.13 or higher`

lower might work this is just what I am running

## Running
Docker allows us to quickly spin up a postgres db that matches whatever we have in ./db/database.sql

One thing to note is that docker doesn't remove the db's data automatically so when you want to "update" it to match any changes in database.sql you will have to run the following



`docker-compose down --rmi all && docker-compose up db`

if you simply want to bring the db up (choose this option if your computer has less than 8GB of RAM):

`docker-compose up db`

For running the backend and the frontend you have two options. The easiest is to simply use docker-compose and run (need decent computer)

`docker-compose up`

and if you need to rebuild (because you updated the dependencies for example)

`docker-compose up --build`

You can also run them locally (better speed and more control, use this if <8GB of RAM)

in ./backend

`npm i`

`npm run start`

in ./web

`npm i`

`npm run start`
