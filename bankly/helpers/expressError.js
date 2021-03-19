/** ExpressError extends the normal JS error so we can easily
 *  add a status when we make an instance of it.
 *
 *  Since we are using JSONSchema and will return an array of
 *  errors we want to make sure we display that properly
 *  The error-handling middleware will return this.
 */

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    if (process.env.NODE_ENV !== "test") {
      console.error(this.stack);
    }
  }
}

/** 400 BAD REQUEST error. */

class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

module.exports = { ExpressError, BadRequestError };
