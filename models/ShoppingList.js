const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
class ShoppingList extends Model{};
ShoppingList.init(
    {  
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
             model: 'recipe',
             key: 'id',
             unique: false
            },
       },
        ingredient_name: {
            type: DataTypes.STRING,
            references: {
               model: 'ingredients',
               key: 'ingredient_name',
               unique: false
             },
        },    
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        in_stock: {
         type: DataTypes.BOOLEAN,
         allowNull:false,
        }, 

        note: {
            type: DataTypes.TEXT,
            allowNull: false ,
        }
    },
    {
        sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'list',
    }
);

module.exports=ShoppingList;