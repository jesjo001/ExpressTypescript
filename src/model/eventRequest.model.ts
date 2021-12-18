import mongoose from 'mongoose';
import {
    USER_TYPE,
    EVENT_APPROVAL_STATUS
} from "../utils/Constants"

export interface EventReqDocument extends mongoose.Document {
    eventName: string;
    eventId: string;
    organizationId: string;
    counselorId: string;
    studentId: string;
    status: string;
    dateApproved: Date;
    createdAt: Date;
    updatedAt: Date;
}

const eventReqSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    organizationId: {
        type: String,
        required: true
    },
    counselorId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: EVENT_APPROVAL_STATUS
    },
    dateApproved: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const EventRequest = mongoose.model<EventReqDocument>("EventRequest", eventReqSchema);
export default EventRequest;
