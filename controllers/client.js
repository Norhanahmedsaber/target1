import Client from '../Models/Client.js';

async function signUp({fullName,email,password}){
    const client = await Client.create(fullName,email,password)
    return client
}
async function signin({fullName,email,password}){
    const client = await Client.find(fullName,email,password)
    return client
}
export default{
    signUp
}