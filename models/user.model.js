import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    firstName: {
        type: String,
        required: [true, 'Firstname is required']

    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required']

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        unique: true,
        minLength: [6, "Password length must be of atleast 6 characters"]
    },
    phone_no: {
        type: String,
        required: true,
        match: [/^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/, "invalid Phone Number"],
        minLength: [10, "invalid Phone Number"]


    },
    address: {
        type: String,
        required: [true, 'Address is required']

    },
    ward: {
        type: String,
        required: [true, "ward cannot be empty"],
        lowercase: true

    },

    designation: {
        type: String,
        default: 'member'


    },
    dob: {
        type: String,
        required: true,
        trim: true,

    },
    familyPhoto: {
        type: String,
    },
    familyDetails: [{
        type: mongoose.Types.ObjectId,
        ref: 'familyDetails'
    }]

},
    {
        timestamps: true
    })

export default mongoose.model("User", userSchema)