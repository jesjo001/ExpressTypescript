import { omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Counsellor, { CounselorDocument } from "../../model/counsellor.model";

export const createCounsellor = async (
  input: DocumentDefinition<CounselorDocument>
) => {
  return await Counsellor.create(input);
};

export function findCounsellor(
  query: FilterQuery<CounselorDocument>,
  options: QueryOptions = { lean: true }
) {
  return Counsellor.findOne(query, {}, options);
}

export function findAllCounsellor() {
  return Counsellor.find({});
}

export const findAndUpdate = (
  query: FilterQuery<CounselorDocument>,
  update: UpdateQuery<CounselorDocument>,
  options: QueryOptions
) => {
  return Counsellor.findOneAndUpdate(query, update, options);
};

export function deleteCounsellor(query: FilterQuery<CounselorDocument>) {
  return Counsellor.deleteOne(query);
}
