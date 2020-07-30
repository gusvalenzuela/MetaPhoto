## MetaPhoto
Full-stack web application where users can upload their personal rock climbing photos and share the location of the climb shown. 

## [Upload and share your rock climbing adventures with us at MetaPhoto!](https://bit.ly/metaphoto) 

## Project Description

Originally an idea brought forth by Luis Sandoval (@MastadonRising) now a full realization of an application that allows users to share their rock climbing photos. We wanted users to be able to upload the their rock climbing images but without having to wait get home or remembering where the rock climb was exactly. Using an uploaded photo's GPS information we are able to pull a list of possible known climbs in the area. The user will then select a climbing route or have an option to search by location manually. Each photo will have a rock climb route associated with it and in this way users across the application are able to learn more about each route seen in the photo(s). 

## Running the application locally

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need MongoDB installed if you want to run this application locally. For help installing MongoDB, visit: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

Once installed, make sure the MongoDB daemon is running with the following command line command:
````
$ mongod
````

### Installing

Git clone the repository to your local machine: 

HTTPS:
```
$ git clone https://github.com/gusvalenzuela/MetaPhoto.git
```
SSH:
````
$ git clone git@github.com:gusvalenzuela/MetaPhoto.git
````

Next, cd into the repository you cloned and install the necessary dependencies by running (or package manager of your choice):
````
$ npm run install
````

You will then be able to start the app locally by runnning:
````
$ npm start
````
or 
````
$ npm run dev
````

## Built With

* [MongoDB](https://www.mongodb.com/) - NoSQL Database
* [Express.js](https://expressjs.com/) - Node.js framework
* [React.js](https://reactjs.org/) - MVC front-end framework 
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [NPM](https://www.npmjs.com/) - Dependency management
* [Semantic UI React](https://react.semantic-ui.com/) - CSS framework
* [Passport](http://www.passportjs.org/) - Authentication platform

## Collaborators / Team
- Quinn Calhoun: @QuinnCalhoun
- Luis Sandoval: @MastadonRising
- Gus Valenzuela: @gusvalenzuela

See the full list of [contributors](https://github.com/gusvalenzuela/MetaPhoto/graphs/contributors) who participated in this project along with individual commit history. 

## Planned updates

At the moment, this app is the minimum viable product. We hope to make updates to improve the UI/UX, and add more functionality such as: adding favorites, mobile-friendly, offline capability, and so much more..
