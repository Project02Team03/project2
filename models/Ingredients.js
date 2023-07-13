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
        
        ingredient_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL,
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

module.exports=List;