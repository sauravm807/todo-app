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

    createTodo({ title, description, status, id }) {
        return mysql.query(`
                    INSERT INTO todo 
                        (title, user_id, description, status) 
                    VALUES 
                        ('${title}', ${id}, '${description}', ${status});
                `);
    }
}

module.exports = new Modal();