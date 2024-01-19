import Client from '../Models/Client.js'
import bcrypt from 'bcrypt'

async function signUp({fullName , email , password }){
    password = ecncryptPassword(password)
    const client = await Client.create({fullName , email ,  password})
    return Client
}
async function signin(payload){
    const client = await Client.find(payload)
    return client
}
async function signin(payload){
    const client = await Client.find(payload)
    return client
}

function ecncryptPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}
export default{
    signUp,
    getbyemail,
    signin
}