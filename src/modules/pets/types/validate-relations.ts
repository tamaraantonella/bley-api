export type ValidateRelationErrors = {
  ownerId: string;
  breedId: string;
}
export type ValidateRelationsOutput = true | ValidateRelationErrors;

