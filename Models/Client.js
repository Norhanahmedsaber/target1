const mongoose = require('mongoose')
const ClientSchema= mongoose.Schema(
    {
        
    },
    {
        timestamp: true
    }
)

const Client = mongoose.model('Client', ClientSchema)
module.export = Client