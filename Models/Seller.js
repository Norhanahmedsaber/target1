const mongoose = require('mongoose')
const SellerSchema= mongoose.Schema(
    {
        
    },
    {
        timestamp: true
    }
)

const Seller = mongoose.model('Seller', SellerSchema)
module.export = Seller