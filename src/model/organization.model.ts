import mongoose from "mongoose";
import User from "./user.model";
import { USER_TYPE, ORGANIZATION_TYPE } from "../utils/Constants";

export interface OrganizationDocument extends mongoose.Document {
  name: string;
  type: string;
  email: string;
  website: string;
  address: string;
  city: string;
  country: string;
  phoneNum: string;
  role: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ORGANIZATION_TYPE,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      unique: true,
      required: false,
    },
    phoneNum: {
      type: String,
      unique: true,
      required: false,
    },
    role: {
      type: String,
      default: "organization",
      enum: USER_TYPE,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Organization = mongoose.model<OrganizationDocument>(
  "Organization",
  organizationSchema
);

export default Organization;
