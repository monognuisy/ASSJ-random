// eslint-disable-next-line @typescript-eslint/no-unused-vars
class EmptyDatabaseError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, EmptyDatabaseError.prototype);
  }
}