class EmptyDatabaseError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, EmptyDatabaseError.prototype);
    }
}