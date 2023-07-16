const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
class Ingredients extends Model{};
Ingredients.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ingredient_img:{
            type: DataTypes.TEXT,
            allowNull:false
        }
        ,
        ingredient_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        units: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        in_stock: {
         type: DataTypes.BOOLEAN,
         allowNull:false,
         defaultValue: false
        }, 
        in_list: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false
           }, 

        note: {
            type: DataTypes.TEXT,
            allowNull:true ,
        }
    },
    {
        sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ingredients',
    }
);

module.exports=Ingredients;