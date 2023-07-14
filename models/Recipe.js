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
        // description: {
        //     type: DataTypes.TEXT,
        //     allowNull: false
        // },
        // is_favorite: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false
        // },
       ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
       }
    },
    {
        sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
    }
);

module.exports=Recipe;