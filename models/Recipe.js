const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model{};
Recipe.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        image_link:{ 
           type: DataTypes.TEXT,
           allowNull: true,
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // is_favorite: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false
        // },
        ingredients: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'Ingredients cannot be null',
              },
              notEmpty: {
                msg: 'Ingredients cannot be empty',
              },
            },
          },
        },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
);

module.exports = Recipe;