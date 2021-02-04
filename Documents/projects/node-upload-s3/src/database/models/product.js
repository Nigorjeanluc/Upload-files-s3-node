import { Model, DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER()
      },
      name: {
        type: new DataTypes.STRING(),
        allowNull: false
      },
      category: {
        type: new DataTypes.STRING(),
        allowNull: false
      },
      design: {
        type: new DataTypes.STRING(),
        allowNull: true
      },
      quantity: {
        type: new DataTypes.STRING(),
        allowNull: true
      },
      material: {
        type: new DataTypes.STRING(),
        allowNull: true
      },
      images: {
        type: new DataTypes.STRING(),
        allowNull: true,
        // Serialize array and store as a string
        get() {
          return this.getDataValue('images').split(';');
        },
        set(val) {
          this.setDataValue('images', val.join(';'));
        }
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
      modelName: 'Product',
      tableName: 'products'
    }
  );
  return Product;
};
