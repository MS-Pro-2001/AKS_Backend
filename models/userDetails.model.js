// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({

//     firstName: {
//         type: String,
//         required: true,
//         unique: false
//     },
//     lastName: {
//         type: String,
//         required: true,
//         unique: false
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     phone_no: {
//         type: Number,


//     },
//     address: {
//         type: String,

//     },
//     ward: {
//         type: String,

//     },

//     designation: {
//         type: String,
//         default: 'member'


//     },
//     dob: {
//         type: Date,
//         trim: true

//     },
//     familyPhoto: {
//         type: String,
//     },
//     familyDetails: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'familyDetails'
//     }]

// },
//     {
//         timestamps: true
//     })

// export default mongoose.model("User", userSchema)