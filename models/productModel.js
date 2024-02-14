const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a  name"],
        },
        description: {
            type: String,
            required: [true, "Please enter a  Message"]
        },
       
    },
    {
        timestamps: true
    }
)


const Producr = mongoose.model('Product', productSchema);

module.exports = Producr;