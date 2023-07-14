const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SelectedRecipe extends Model{};
SelectedRecipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
      user_id:{
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          unique: false
        }
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'recipe',
          key: 'id', 
          unique: false
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'selected_recipes',
    }
  );
  
  module.exports = SelectedRecipe;
  