const { mysql } = require('../../database/connection');

class Modal {
    getTodoByTitle({ title, id }) {
        return mysql.query(`
                    SELECT 
                        id
                    FROM todo 
                    WHERE title = '${title}' AND user_id = ${id};
                `);
    }

    getTodoByTitleD({ title, id }) {
        return mysql.query(`
                    SELECT 
                        id
                    FROM todo 
                    WHERE title = '${title}' AND id <> ${id};
                `);
    }

    createTodo({ title, description, status, id }) {
        return mysql.query(`
                    INSERT INTO todo 
                        (title, user_id, description, status) 
                    VALUES 
                        ('${title}', ${id}, '${description}', ${status});
                `);
    }

    getAllTodos({ id }) {
        return mysql.query(`
                    SELECT
                        id, user_id, title, description, status, created_at, updated_at
                    FROM todo
                    WHERE user_id = ${id};
                `);
    }

    getTodoById({ id, uid }) {
        return mysql.query(`
                    SELECT
                        id, user_id, title, description, status, created_at, updated_at
                    FROM todo
                    WHERE user_id = ${uid} AND id = ${id};
                `);
    }

    updateTodo({ id, title, description, status }) {
        let str = '';

        if (title) str += str ? `, title = '${title}'` : `SET title = '${title}'`;

        if (description) str += str ? `, description = '${description}'` : `SET description = '${description}'`;

        if (status == false || true) str += str ? `, status = '${status ? 1 : 0}'` : `SET status = '${status ? 1 : 0}'`;        

        return mysql.query(`UPDATE todo ${str} WHERE id = ${id};`);
    }
    
    deleteTodo({ id }) { 
        return mysql.query(`DELETE FROM todo WHERE id = ${id};`);
    }
}

module.exports = new Modal();