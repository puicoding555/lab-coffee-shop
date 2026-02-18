const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  })

  // hash password ก่อนสร้าง
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  })

  // compare password login
  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}

