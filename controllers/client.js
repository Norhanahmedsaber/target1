import Client from '../Models/Client.js';

async function signUp({fullName,email,password}){
    await Client.create(fullName,email,password)
    return Client
}
async function signin(payload){
    const client = await Client.find(payload)
    return client
}
async function getbyemail(email){
    const client = await Client.find(email)
    return client
}
export default{
    signUp,
    getbyemail
}