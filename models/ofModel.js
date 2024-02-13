const mongoose = require('mongoose')

const ofSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a  name"],
        },
        designation: {
            type: String,
            required: [true, "Please enter a  Message"]
        },
       
    },
    {
        timestamps: true
    }
)


const OF = mongoose.model('Of', ofSchema);

module.exports = OF;