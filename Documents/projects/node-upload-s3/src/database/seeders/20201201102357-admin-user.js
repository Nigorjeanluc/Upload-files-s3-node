"use strict";

// const { hashPassword } = require("../../utils/password");

module.exports = {
    up: (queryInterface) =>
        queryInterface.bulkInsert(
            "users",
            [
                {
                    firstName: "admin",
                    lastName: "admin",
                    username: "admin",
                    email: "admin@admin.admin",
                    password:
                        "$2a$10$F4bgdWopTSycjyfISZSJwuQPA3g4qAJ0lW5pv1yCGH/Znwdp53Idq",
                    role: "admin",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        ),

    down: (queryInterface) => queryInterface.bulkDelete("users", null, {})
};
