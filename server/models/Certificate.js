import { Schema, model } from "mongoose";

const CertificateSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    completionDate: {
        type: Date
    }
}, { timestamps: true });

const Certificate = model("Certificate", CertificateSchema);

export default Certificate;