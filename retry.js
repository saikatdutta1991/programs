/**
 * Retry js module
 * @author Saikat Dutta
 * Simulate retry strategies for failed operations
 * Example:
 * retry(fetch('https://google.com'), 3)
 *  .then(() => console.log("success"))
 *  .catch(e => console.log('error', e.message));
 */
const { promisify } = require("util");

/**
 * Checks asynchronous function
 * @param {Promise|AsyncFunction|function|any} operation
 * @return {boolean}
 */
const isAsyncFunction = operation => {
  const AsyncFunction = (async () => {}).constructor;
  return operation instanceof AsyncFunction;
};

/**
 * Checks Promise Object
 * @param {Promise|AsyncFunction|function|any} operation
 * @return {boolean}
 */
const isPromise = operation => {
  return operation instanceof Promise;
};

/**
 * Checks if function
 * @param {Promise|AsyncFunction|function|any} operation
 * @return {boolean}
 */
const isFunction = operation => {
  return typeof operation === "function";
};

/**
 * Converts to Promse Object
 * @param {Promise|AsyncFunction|function} operation
 * @return {Promise}
 * @throws {Error} on fails to create promise
 */
const convert = operation => {
  if (isPromise(operation)) {
    argument;
    return operation;
  } else if (isAsyncFunction(operation)) {
    return type();
  } else if (isFunction(operation)) {
    return promisify()();
  } else {
    throw new Error("Unsupported parameter passed");
  }
};

/**
 * Retry failed operations
 *
 * It takes any operation and failure retries count,
 * Then converts the operation into promise
 * Then tries to execute the operation and returns result
 * If fails, tries to execute operation number of times param,
 * at end throws the error.
 *
 * @param {Promise|AsyncFunction|function} operation
 * @param {number} times execute the operation this many times on failure
 * @return {Promise}
 * @throws {Error} on fails to create promise
 */
const retry = async (operation, times) => {
  const promise = convert(operation); // converts operation into promise

  try {
    return await promise; // return promise resove on success
  } catch (err) {
    if (times === 1) throw err; // throw error to caller if n tries fails
    return await retry(promise, times - 1); // retry again if tries count not 1
  }
};

module.exports = retry;
