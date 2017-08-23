module.exports = function (sequelize, DataTypes) {
  const modelName = 'todo'

  const attrs = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.STRING
    }
  }

  return sequelize.define(modelName, attrs)
}
