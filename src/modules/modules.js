const router = require('express').Router();
const authRouter = require("./user/user.router");
const todoRouter = require("../modules/todos/todo.router");

class Modules {
    constructor() {
        this.modules = router;
        this.core();
    }

    core() {
        // Adding all the routes here
        this.modules.use('/auth', authRouter.getRouters());
        this.modules.use('/todo', todoRouter.getRouters());

        this.modules.get('*', function (req, res) {
            res.json({
                code: 400,
                data: null,
                message: 'Not Found.',
                error: null
            });
        });
    }

    getRouters() {
        return this.modules;
    }
}

module.exports = Modules;