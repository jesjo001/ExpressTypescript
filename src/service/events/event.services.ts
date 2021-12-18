import { omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Event, { EventDocument } from "../../model/event.model";

export const createEvent = async (input: DocumentDefinition<EventDocument>) => {
  return await Event.create(input);
};

export function findEvent(
  query: FilterQuery<EventDocument>,
  options: QueryOptions = { lean: true }
) {
  return Event.findOne(query, {}, options);
}

export function findAllEvents() {
  return Event.find({});
}

export const findAndUpdate = (
  query: FilterQuery<EventDocument>,
  update: UpdateQuery<EventDocument>,
  options: QueryOptions
) => {
  try {
    return Event.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error as any);
  }
};

export function deleteEvent(query: FilterQuery<EventDocument>) {
  return Event.deleteOne(query);
}
