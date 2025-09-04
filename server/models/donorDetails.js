const mongoose = require("mongoose");

const donorDetailsSchema = new mongoose.Schema(
  {
    donorId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    bloodType: String,
    weight: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
    hasDiabetes: String,
    hasHeartCondition: String,
    hasHypertension: String,
    hasTattoo: String,
    lastDonationDate: String,
    medications: String,
    preferredDays: String,
    preferredTime: String,
    emergencyContact: String,
    emergencyPhone: String,
    additionalNotes: String,
  },
  {
    timestamps: true,
  }
);

const DonorDetails = mongoose.model("donorDetails", donorDetailsSchema);
module.exports = DonorDetails;
