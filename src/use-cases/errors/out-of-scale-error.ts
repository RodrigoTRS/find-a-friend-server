export class OutOfScaleError extends Error {
  constructor(atr: string) {
    super(`Attribute: ${atr} is out of scale error.`);
  }
}
