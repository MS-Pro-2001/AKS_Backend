import mongoose, { Schema } from "mongoose";

const familyDetailsSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "user is required"]
    },
    name_of_member: {
        type: String,
        required: [true, "name_of_member is required"]

    },
    relationship_with_user: {
        type: String,
        required: [true, 'realtionship is required']

    },

    dob: {
        type: Date,
        required: [true, "dob is required"]

    }

},
    {
        timestamps: true
    })

export default mongoose.model("familyDetails", familyDetailsSchema)