export class OrgWithSameNameError extends Error {
  constructor() {
    super("Organization with this name already exists.");
  }
}
