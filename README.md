# Planit

The goal of this project is to familiarize myself with the development of a cross-platform application, using React-native and Electron. The first goal is to get most of the features working in a regular web application. Once satisfied with the development state I will try to set up a CI/CD pipeline and host the said website. Having the website hosted will also push me to handle DB migrations properly which is something that I want to be able to do properly (even if the app won't have any users at that time and resetting everything would be the easiest solution).

Current features that I am trying to implement before hosting the website and getting the mobile applications up to speed, order corresponds to priority ( and will probably change):

- [X] Pomodoro
<img src="https://user-images.githubusercontent.com/72809488/208276024-776644c9-7ba2-4403-a755-38734d0571cf.png " height="200" />

- [X] TODO List
- [X] User account and auth
<img src="https://user-images.githubusercontent.com/72809488/208276083-abbd204f-b387-42b8-9547-e3df0b7ddf9f.png" height="200" />

- [ ] Time tracking
- [ ] Time tracking integration with Pomodoro
- [ ] Have a task board

Once those features are implemented, and the hosting and native app side of things is done I will potentially move on to the following features:

- [ ] Journaling
- [ ] Notes
- [ ] App and website blocker (Extension required?)
- [ ] ...

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
You can choose to handle the db on your local machine and also run everything locally but it might become tricky to do so as people update the schema.
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
