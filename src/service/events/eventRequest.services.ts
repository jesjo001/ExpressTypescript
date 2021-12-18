import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import EventRequest, { EventReqDocument } from "../../model/eventRequest.model";

export const createEventReq = async (
  input: DocumentDefinition<EventReqDocument>
) => {
  return await EventRequest.create(input);
};

export function findEventReq(
  query: FilterQuery<EventReqDocument>,
  options: QueryOptions = { lean: true }
) {
  return EventRequest.findOne(query, {}, options);
}

export const findAndUpdateReq = (
  query: FilterQuery<EventReqDocument>,
  update: UpdateQuery<EventReqDocument>,
  options: QueryOptions
) => {
  try {
    return EventRequest.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error as any);
  }
};

export function findAllEventsReq() {
  return EventRequest.find({});
}

export function deleteEventReq(query: FilterQuery<EventReqDocument>) {
  return EventRequest.deleteOne(query);
}
