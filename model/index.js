const Sequelize = require('sequelize')
const modelsCharger = require('sequelize-models-charger')

const sequelizeConfig = require('../config')

const sequelize = new Sequelize(sequelizeConfig)

sequelize.sync()

module.exports = modelsCharger(__dirname, { sequelize })
