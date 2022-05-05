/**
 * @desc   Send any success response
 *
 * @param  {string} message
 * @param  {object | array} results
 * @param  {number} statusCode
 */
export function successHandler(message: string, results: object | string[], statusCode: number) {
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
}

/**
 * @desc   Send any error response
 *
 * @param  {string} message
 * @param  {number} statusCode
 */
export function errorHandler(message: string, statusCode: number) {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code === statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
    error: true,
  };
}

/**
 * @desc   Send any validation response
 *
 * @param  {object | array} errors
 */
export function validationHandler(errors: object | string[]) {
  return {
    message: "Validation errors",
    code: 422,
    error: true,
    errors,
  };
}
