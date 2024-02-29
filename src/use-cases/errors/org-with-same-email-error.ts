export class OrgWithSameEmailError extends Error {
  constructor() {
    super("Organization with this email already exists.");
  }
}
