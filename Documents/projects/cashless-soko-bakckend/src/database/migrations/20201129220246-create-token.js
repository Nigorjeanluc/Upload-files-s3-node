const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("tokens", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: new DataTypes.INTEGER()
            },
            userId: {
                type: new DataTypes.INTEGER()
            },
            token: {
                type: new DataTypes.STRING()
            },
            createdAt: {
                allowNull: false,
                type: new DataTypes.DATE()
            },
            updatedAt: {
                allowNull: false,
                type: new DataTypes.DATE()
            },
            deletedAt: {
                type: new DataTypes.DATE()
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("tokens");
    }
};
