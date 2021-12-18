import { omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Student, { StudentDocument } from "../../model/student.model";

export const createStudent = async (
  input: DocumentDefinition<StudentDocument>
) => {
  return await Student.create(input);
};

export function findStudent(
  query: FilterQuery<StudentDocument>,
  options: QueryOptions = { lean: true }
) {
  return Student.findOne(query, {}, options);
}

export function findAllStudents() {
  return Student.find({});
}

export const findAndUpdate = (
  query: FilterQuery<StudentDocument>,
  update: UpdateQuery<StudentDocument>,
  options: QueryOptions
) => {
  try {
    return Student.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error as any);
  }
};

export function deleteStudent(query: FilterQuery<StudentDocument>) {
  return Student.deleteOne(query);
}
