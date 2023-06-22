const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (candidatePassword, storedPassword) =>
  bcrypt.compareSync(candidatePassword, storedPassword);

module.exports = {
  encryptPassword,
  comparePassword,
};
