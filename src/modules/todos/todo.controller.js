const validation = require('./todo.validation');
const model = require('./todo.model');

class TodoController {
    /**
     * getAllTodos- To get all todos
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAllTodos(req, res, next) {
        try {
            const { id } = req.user;

            // validation
            const { error, value } = validation.params(req.body);
            if (error) return next({ status: 403, message: error.details[0].message });

            const { skip, limit } = value;
            const [todos] = await model.getAllTodos({ id, skip, limit });

            if (!todos.length) return next({ status: 404, message: 'No todo found.' });

            res.status(200).json({ status: 200, message: "Todo list found", data: todos });
        } catch (error) {
            next(error);
        }
    }

    /**
     * getTodoById- To get todo by id
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getTodoById(req, res, next) {
        try {
            const { id: uid } = req.user;

            // validation
            const { error, value } = validation.params(req.params);
            if (error) return next({ status: 403, message: error.details[0].message });

            const { id } = value;

            const [todos] = await model.getTodoById({ id, uid });

            if (!todos.length) return next({ status: 404, message: 'No todo found.' });

            res.status(200).json({ status: 200, message: "Todo found", data: todos });
        } catch (error) {
            next(error);
        }
    }

    /**
     * createTodo - To create a new todo
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
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

            res.status(200).json({ status: 200, message: "createTodo", data: { id: insertTodo.insertId } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * updateTodo - To update a todo
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async updateTodo(req, res, next) {
        try {
            const { id: uid } = req.user;
            // validation
            const { error, value } = validation.update(req.body);
            if (error) return next({ status: 403, message: error.details[0].message });

            const { id, title, description, status } = value;

            const [ifTodoExist] = await model.getTodoById({ id, uid });
            if (!ifTodoExist.length) return next({ status: 400, message: `Todo doesn't exist.` });

            if (title) {
                const [ifTodoTitlePresent] = await model.getTodoByTitleD({ title, id });
                if (ifTodoTitlePresent.length) return next({ status: 400, message: 'Todo title already created.' });
            }

            const [updateTodo] = await model.updateTodo({
                id,
                title,
                description: description ? description.replace(/'/g, "''") : null,
                status
            });

            if (!updateTodo.affectedRows) return next({ status: 400, message: 'Todo not updated.' });

            res.status(200).json({ status: 200, message: "Todo updated", data: { id, title, description, status } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * deleteTodo - To delete a todo
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteTodo(req, res, next) {
        try {
            const { id: uid } = req.user;

            // validation
            const { error, value } = validation.params(req.params);
            if (error) return next({ status: 403, message: error.details[0].message });

            const { id } = value;

            const [todos] = await model.getTodoById({ id, uid });

            if (!todos.length) return next({ status: 404, message: 'No todo found.' });

            const deleted = await model.deleteTodo({ id });

            if (!deleted[0].affectedRows) return next({ status: 400, message: 'Todo not deleted.' });

            res.status(200).json({ status: 200, message: "Todo deleted", data: null });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TodoController();