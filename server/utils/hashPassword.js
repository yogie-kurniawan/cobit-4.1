import bcrypt from "bcryptjs";
const saltRounds = 10;

const hashPassword = async (password) => {
  let hashedPassword = password;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
  return hashedPassword;
};

export default hashPassword;
