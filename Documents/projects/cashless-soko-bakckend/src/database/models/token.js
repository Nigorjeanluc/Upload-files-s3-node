import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
    class Token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Token.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            });
        }
    }
    Token.init(
        {
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
                type: new DataTypes.STRING(),
                allowNull: false
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
        },
        {
            sequelize,
            modelName: "Token",
            tableName: "tokens",
            paranoid: false
        }
    );
    return Token;
};
