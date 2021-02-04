const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: new DataTypes.INTEGER()
            },
            firstName: {
                type: new DataTypes.STRING()
            },
            lastName: {
                type: new DataTypes.STRING()
            },
            username: {
                type: new DataTypes.STRING(),
                unique: true
            },
            email: {
                type: new DataTypes.STRING(),
                unique: true
            },
            phone: {
                type: new DataTypes.STRING(),
                unique: true
            },
            password: {
                type: new DataTypes.STRING()
            },
            role: {
                type: new DataTypes.ENUM("normal", "admin"),
                allowNull: false,
                defaultValue: "normal"
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: new DataTypes.DATE()
            },
            updatedAt: {
                allowNull: false,
                type: new DataTypes.DATE()
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("users");
    }
};
