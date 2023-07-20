# What's For Dinner?

## Description

Tired of the same old meals? With "What's for Dinner," you'll never run out of delicious recipe ideas again. With a vast collection of mouthwatering recipes from around the world, sourced from top chefs and food bloggers. ~~You can save your favorite recipes and add ingredients you need right to your shopping list.~~

## User Story

```
GIVEN a website with MVC architecture
WHEN a user visits
THEN they can search for recipes
WHEN they wish to view a recipe detail
THEN they are prompted to make an account
WHEN the user in authenticated
THEN they can favorite the recipe and it is saved to their account
WHEN the user visits the /recipes page
THEN they see their recipes
WHEN the user views the recipe detail page
THEN they can add ingredients to a shopping list with buttons
WHEN the user view the /shopping-list page
THEN they can remove items that have been purchased.
```

## Installation

To run this application locally, clone or download the repo which contains the necessary models, js, and handlebars views organized in the MVC structure. You will need to create an `.env` file for your local repo to contain the database name, user, password, API key and id from Edamam, and session secret.

## Usage

The site is currently deployed for review on [Heroku](https://p2t3-whats-for-dinner-22c46fecc28a.herokuapp.com/)

![What's For Dinner](https://github.com/Project02Team03/whats-for-dinner/assets/123843930/887c7d16-3cf0-458b-9d93-7e27ee9843ce)


1. Log into your local MySQL environment with `mysql -u root -p`. You will be prompted to enter your password for your MySQL instance.
2. Next locate the schema source for your database by entering `source db/schema.sql` or the path to the schema.sql file in your directory. This should respond with the database being created. If created successfully you can exit the MySQL interface with `exit`
3. If you want to start with data in the blog, you can run the seeds with `npm run seed`. This will fill in the tables of the database with Users, Comments, and blog Posts.
4. Then you can start the server by typing `npm run start`.
5. The server will be running on the local port listed in the CLI.


## License
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The MIT License

## Questions

Created by [Elena Fadeeva](https://github.com/elenafwork), [Tess Guilmette](https://github.com/tguils), [Travis Hoffman](http://github.com/vulpesviator), 


