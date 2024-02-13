const mongoose = require('mongoose')

const defautsSchema = mongoose.Schema(
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


const Defauts = mongoose.model('Defaut', defautsSchema);

module.exports = Defauts;