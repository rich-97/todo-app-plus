module.exports = {
  username: null,
  password: null,
  dialect: 'sqlite',
  storage: 'db.sqlite',
  omitNull: true,
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: false,
    underscored: true
  }
}
