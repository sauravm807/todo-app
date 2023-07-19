const router = require('express').Router();
const todoController = require('./todo.controller');
const { authenticateToken } = require('../../middlewares/auth.middleware');

class AuthRouter {
    constructor() {
        this.routes = router;
        this.core();
    }

    core() {
        // Adding all the routes here
        this.routes.use(authenticateToken);
        this.routes.get("/", todoController.getAllTodos);
        this.routes.get("/:id", todoController.getTodoById);
        this.routes.post("/", todoController.createTodo);
        this.routes.put("/", todoController.updateTodo);
        this.routes.delete("/:id", todoController.deleteTodo);
    }

    getRouters() {
        return this.routes;
    }
}

module.exports = new AuthRouter();