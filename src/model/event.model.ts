import mongoose from "mongoose";
import { USER_TYPE } from "../utils/Constants";

export interface EventDocument extends mongoose.Document {
  eventName: string;
  createdBy: string;
  organizationId: string;
  thumbNail: string;
  backgroundImage: string;
  description: string;
  time: string;
  attendees: Array<string>;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    organizationId: {
      type: String,
      required: true,
    },
    thumbNail: {
      type: String,
      required: false,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attendees: {
      type: Array,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model<EventDocument>("Event", eventSchema);
export default Event;
