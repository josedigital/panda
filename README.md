# Panda App Documentation

### Installing
- You will need to install [gulp](http://gulpjs.com/) globally: run ```npm i gulp -g``` 
- Fork the repository
- CD into the repo and run ```npm install``` to install all dependencies
- Start site by initiating the default gulp taks in the command line: ```gulp```


### Documenting

Please use the "documnentation" branch to document any of your work that requires installation, initialization, or any otehr type of explanation.

- ```git checkout documentation```
- ```git pull origin dev```
- Add your instructions/guides/etc to this README file. 
- Use an h3 heading to start your section.
- The README file should be the only file changed or updated in this branch.
- ```git push origin documentation``` when done.

### DB Schema and Seeds
- create db to run locally
- data base name and 5 tables are in the schema.sql file
- seeds for two tables, resource_type, and technology are in the seeds.sql

### Sequelize CLI commands for models
- sequelize model:create --name job_search --attributes "api_name:string, api_uri:string, search_params:string, default_city:string, key_word:string"
- sequelize model:create --name resource_type --attributes "type:string"
- sequelize model:create --name technology --attributes "tech:string, description:string"
- sequelize model:create --name library --attributes "resource:string"
- sequelize model:create --name user --attributes "user_name:string, display_name:string, email:string, git_link:string, technologies:string, main_text:text, git_repo1:string, git_text1:string, git_repo2:string, git_text2:string, git_repo3:string, git_text3:string, avitar_link:string"

### Profile View and Login
- click the login link on the honepage or go to /login.
- click the 'login with github' link and authorize the app. this should redirect you to your profile page and list out your repos.
- please report any issues you experience with login.