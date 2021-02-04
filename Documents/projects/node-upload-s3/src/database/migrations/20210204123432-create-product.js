const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
