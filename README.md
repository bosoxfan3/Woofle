Woofle
======

Table of Contents
-----------------
1. [Purpose](https://github.com/bosoxfan3/Woofle#purpose)
2. [Screenshots](https://github.com/bosoxfan3/Woofle#screenshots)
3. [Getting Started](https://github.com/bosoxfan3/Woofle#getting-started)
4. [Technologies Used](https://github.com/bosoxfan3/Woofle#technologies-used)

Purpose
-------
### What Is Woofle?
[Woofle](https://woofle.herokuapp.com/) makes learning about dog breeds easier. With a vast database, a simple interface, and minimal text, Woofle is extremely user friendly and useful for people of all ages.

### Why Use Woofle?
Woofle was created to aggregate basic visual information about dog breeds. It is intended to be an educational tool and help people make smarter decisions when shopping for a dog, as well as learn more about the innate traits of their own dogs or dogs they may come across.

Screenshots
-----------
**Landing Page:** In order to access the app and save/maintain their own profile, users will need to sign up and/or log in. There is a demo link provided for users who do not wish to sign up.
![Landing Page](/screenshots/1.png)

**Search Page:** Choose from a list of over 100 breeds or complete a random search
![Search Page](/screenshots/2.png)

**Breed Info Page:** The breed information page will have up to 8 pictures and 5 videos of the selected breed. Videos can be watched in the app or re-directed to YouTube. Clicking the "Add to Favorites" button will add that breed to the user's favorites list
![Breed Info Page](/screenshots/3.png)

**Favorites Page:** This page displays a list of the user's saved favorite breeds and allows for easy access to that breed's information page.
![Favorites Page](/screenshots/4.png)

Getting Started
--------------
### Installing
```
>   git clone https://github.com/bosoxfan3/Woofle.git
>   cd Woofle
>   npm install
```
### Launching
```
>   npm start
```
Then open [`localhost:8080`](http://localhost:8080) in a browser.

**As mentioned above, either sign up, log in, or use the demo account to continue using Woofle.**

### Testing
```
>   npm test
```

Technologies Used
-----------------
Woofle is a Node Javascript app created with Express. It also utilizes MongoDB to track users and their favorites. Developers will need to install MongoDB and Node.js for full functionality.
### Front End
  * HTML
  * CSS
  * Javascript
  * jQuery

### Back End
  * Node.js: Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications
  * Express: Express is a minimal and flexible node.js web application framework
  * MongoDB: MongoDB is the leading NoSQL database
  * Mocha and Chai: Mocha is a Javascript test framework. Chai is an assertion library used for testing.
  * TravisCI: Used for continuous integration and deployment

### APIs
  * [YouTube](https://youtube.com) for videos
  * [Dog API](https://dog.ceo/dog-api/) for pictures

