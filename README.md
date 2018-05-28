
NorthcodersNews

Northcoders News is a social news aggregation, web content rating, and discussion website. It is similar to Reddit in that Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added, but the user is unable to delete another users comments. 


Installation Instructions (on your local machine)
You will need to install Node.js at version 9.10.1 to run Northcoders News.

Node
Type the command below to check if you already have node installed:

$ node -v

If node is already installed the output of the command will display the version (e.g. v7.9.0). If you need to install node please follow link (http://nodejs.org/en/).

Install Northcoders News
Please clone the repository https://github.com/ixesta/BE-FT-northcoders-news

$ git clone https://github.com/ixesta/BE-FT-northcoders-news

To install all dependencies please enter the following commands into the terminal:-

$ cd NorthcodersNews $ npm install

Open an additional terminal window and type the following command to run the application

$ npm start

Once webpack has finished transpiling open a browser window. The application is available on http://localhost:9090 via your web browser.

You will also need to install Mongo. Follow <a href = "https://docs.mongodb.com/manual/installation/">this</a> tutorial

Test Suite
To run the test suite please enter the following command into the terminal

$ npm test

Open a separate terminal window and run:

mongod

Note: The package.json includes a postinstall script which should seed the databases automatically upon installing. It is imperative to be running mongod BEFORE INSTALL or the seed will fail due to not being able to connect to the DB's

node seed/seed.js - manually seeds main database

node seed/test.seed.js - manually seeds test database

npm run dev - starts dev server

npm test - starts test server and runs test (server will d/c once tests have ran)

The server will run locally on http://localhost:9090. By default this route contains a guide to the various endpoints available with this API.


