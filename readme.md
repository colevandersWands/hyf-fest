# hyf-fest 🎉

 Service for programmatically validating student projects.  

### What is it? 
hyf-fest is an express app that scrapes student projects into a temporary directory and let's it's content be validated by the [The Nu Html Checker (v.Nu)](https://validator.w3.org/nu/about.html) from w3.org and responds with lin errors.  Could be triggered by github actions, browser extension, or from a client script that the student copy and pastes into their project. 

Potentially it could accept a secondary param with an url for a test spec to run jest in the future, enabling collaboration between mentors. 

#### To Do

 - [ ] Set up Heroku deployment to include Java SDK
 - [ ] json-fix feature to format json output
 - [ ] Add query param to GET /run that accepts test.spec for Jest 

### How to use?
 Clone this repo and run command `npm start` in terminal to play around with it locally, ~~or deploy with heroku~~. 

Open postman or a browser and hit it! 

    http://localhost:8000/run?url=example.com

### Routes

```
// Get welcome message
GET: /

// Run validator
GET: /run?url= <URL TO STUDENT PROJECT>

```


### Technologies used 
- [express](http://expressjs.com/)
- [vnu-jar](https://validator.github.io/validator/)
- [website-scrape](https://www.npmjs.com/package/website-scraper)
