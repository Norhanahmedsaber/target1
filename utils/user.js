import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function generateToken(user) {
  const token = jwt.sign(
    {
      _id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
    process.env.SECRET,
    {
      expiresIn: "24h",
    }
  );
  user.token = token;
  console.log("Generated token :", user.token);
}


function validEmail(email) {
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return false;
  }
  return true;
}
function validPassword(password){
    const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if(!password.match(regex)){
        return false
    }
    console.log('password match',password)
    return true
}


function ecncryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
async function comparePassword(password, tobeMatched) {
  const result = await bcrypt.compare(password, tobeMatched);
  return result;
}
export default {
  validEmail,
  validPassword,
  comparePassword,
  ecncryptPassword,
  generateToken,
};
