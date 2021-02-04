import { comparePassword, hashPassword } from "../../utils/password";

import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: new DataTypes.INTEGER()
            },
            firstName: {
                type: new DataTypes.STRING(),
                allowNull: false
            },
            lastName: {
                type: new DataTypes.STRING(),
                allowNull: false
            },
            username: {
                type: new DataTypes.STRING(),
                allowNull: false,
                unique: true
            },
            email: {
                type: new DataTypes.STRING(),
                allowNull: false,
                unique: true
            },
            phone: {
                type: new DataTypes.STRING(),
                allowNull: true,
                unique: true
            },
            password: {
                type: new DataTypes.STRING(),
                allowNull: true
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
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users"
        }
    );

    User.beforeCreate(async (_user) => {
        const user = _user;
        if (user.password) {
            user.password = await hashPassword(user.password);
        }
    });

    User.beforeBulkUpdate(async (_user) => {
        const { attributes } = _user;
        if (attributes.password) {
            attributes.password = await hashPassword(attributes.password);
        }
    });

    User.prototype.comparePassword = async function compareUserPassword(password) {
        return comparePassword(password, this.get().password);
    };
    return User;
};
