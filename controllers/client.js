import Client from '../Models/Client.js';

async function signUp({fullName,email,password}){
    await Client.create(fullName,email,password)
}
async function signin({fullName,email,password}){
    const client = await Client.find(fullName,email,password)
    return client
}
export default{
    signUp
}