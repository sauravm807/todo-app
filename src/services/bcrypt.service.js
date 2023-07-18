"use strict;"
const bcrypt = require('bcrypt');
const saltRounds = 10;

class BycryptService {
    encryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds)
                .then(hash => resolve(hash))
                .catch(err => reject("Internal server error."));
        });
    }

    matchPassword({ password, hash }) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash)
                .then(match => resolve(match))
                .catch(err => reject("Internal server error."));
        });
    }
};

module.exports = new BycryptService();