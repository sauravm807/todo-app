# todo-app
todo-app

1. Clone this project: git clone https://github.com/sauravm807/todo-app.git
2. Open folder todo-app then open terminal here.
3. Run command: npm install 
4. Create one .env file in root folder and create following environment variable
    PORT eg. 3000
    DBHOST eg. localhost
    DBUSER eg. root
    DBPASSWORD eg. 123
    DATABASE eg. todo_db
    DIALECT eg. mysql
    ACCESS_TOKEN_SECRET_KEY eg. some_jwt_secret
5. Open mysql and create database named todo_db and run two sql query present in mysql_migration >> query.sql
6. Run command on terminal to start node in development: npm run start:dev
7. Open postman and import the collection present inside postman_collection folder