import mongoose from 'mongoose';
import {
    USER_TYPE,
    USER_SEX,
    STUDENT_GRADE
} from "../utils/Constants"
import User from './user.model'

export interface StudentDocument extends mongoose.Document {
    counselorId: string;
        firstName: string;
    lastName: string;
    organizationId: string;
    phoneNum: string;
    sex: string;
    subscribedEventIds: string;
    grade: string;
    token: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const studentSchema = new mongoose.Schema({
    counselorId: {
        type: String,
        required: true
    },
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
    grade: {
        type: String,
        required: true,
        enum: STUDENT_GRADE
    },
    subscribedEventIds: {
        type: Array,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: "student",
        enum: USER_TYPE
    },
    token: {
        type: String
    },
}, { timestamps: true });


const Student = User.discriminator<StudentDocument>("Student", studentSchema);
export default Student;
