const mongoose = require('mongoose')

const departementSchema = mongoose.Schema(
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


const Departement = mongoose.model('Departement', departementSchema);

module.exports = Departement;