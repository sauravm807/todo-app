const validation = require('./todo.validation');
const model = require('./todo.model');

class TodoController {
    async getAllTodos(req, res, next) {
        try {
            res.status(200).json({ message: "getAllTodos" });
        } catch (error) {
            console.log({ error });
        }
    }

    async getTodoById(req, res, next) {
        try {
            res.status(200).json({ message: "getTodoById" });
        } catch (error) {
            console.log({ error });
        }
    }

    async createTodo(req, res, next) {
        try {
            const { id } = req.user;
            // validation
            const { error, value } = validation.create(req.body);
            if (error) return next({ status: 403, message: error.details[0].message });

            const { title, description, status } = value;

            const [ifTodoAlreadyExist] = await model.getTodoByTitle({ title, id });
            if (ifTodoAlreadyExist.length) return next({ status: 400, message: 'Todo already created.' });

            const [insertTodo] = await model.createTodo({ title, description: description.replace(/'/g, "''"), status, id });

            if (!insertTodo.affectedRows) return next({ status: 400, message: 'Todo not created.' });

            res.status(200).json({ message: "createTodo", data: { id: insertTodo.insertId } });
        } catch (error) {
            next(error);
        }
    }

    async updateTodo(req, res, next) {
        try {
            res.status(200).json({ message: "updateTodo" });
        } catch (error) {
            console.log({ error });
        }
    }

    async deleteTodo(req, res, next) {
        try {
            res.status(200).json({ message: "deleteTodo" });
        } catch (error) {
            console.log({ error });
        }
    }
}

module.exports = new TodoController();