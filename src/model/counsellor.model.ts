import mongoose from 'mongoose';
import {
    USER_TYPE,
    USER_SEX
} from "../utils/Constants"
import User from './user.model'


export interface CounselorDocument extends mongoose.Document {
    firstName: string;
    lastName: string;
    organizationId: string;
    dob: Date;
    phoneNum: string;
    sex: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

const counsellorsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    organizationId: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    phoneNum: {
        type: String,
        unique: true,
        required: true
    },
    sex: {
        type: String,
        required: true,
        enum: USER_SEX
    },
    token: {
        type: String
    },
    role: {
        type: String,
        default: "counselor",
        enum: USER_TYPE
    }
}, { timestamps: true });

const Counsellor = User.discriminator<CounselorDocument>("Counsellor", counsellorsSchema);
export default Counsellor;
