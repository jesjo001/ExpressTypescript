import { omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Organization, {
  OrganizationDocument,
} from "../../model/organization.model";

export const createOrganization = async (
  input: DocumentDefinition<OrganizationDocument>
) => {
  return await Organization.create(input);
};

export function findOrg(
  query: FilterQuery<OrganizationDocument>,
  options: QueryOptions = { lean: true }
) {
  return Organization.findOne(query, {}, options);
}

export function findAllOrg() {
  return Organization.find({});
}

export const findAndUpdate = (
  query: FilterQuery<OrganizationDocument>,
  update: UpdateQuery<OrganizationDocument>,
  options: QueryOptions
) => {
  try {
    return Organization.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error as any);
  }
};

export function deleteOrg(query: FilterQuery<OrganizationDocument>) {
  return Organization.deleteOne(query);
}
