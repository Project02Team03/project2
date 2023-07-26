const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
class ShoppingList extends Model { };
ShoppingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //      model: 'user',
        //      key: 'id',
        //      unique: false
        //     },
        // },

        //    recipe_id: {
        //     type: DataTypes.INTEGER,
        //         references: {
        //          model: 'recipe',
        //          key: 'id',
        //          unique: false
        //         },
        //     },  

        // ingredient_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //        model: 'ingredients',
        //        key: 'id',
        //        unique: false
        //      },
        // }, 

        // amount: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },

        // in_stock: {
        //  type: DataTypes.BOOLEAN,
        //  allowNull:false,
        //  defaultValue: false
        // }, 

        // note: {
        //     type: DataTypes.TEXT,
        //     allowNull: true ,
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'shopping_list',
    }
);

module.exports = ShoppingList;