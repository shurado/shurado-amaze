import { pathOr } from 'ramda';
import { ResponseError } from '../errors';
import { Observable } from 'rxjs';

const CODE_SHOULD_THROW = [
  400,
  401,
  404,
  500
]; // eslint-disable-line no-unused-vars

/**
 * 
 * @param  {[Response]} res [Response should came from `fetch`]
 * @return {Promise<Reponse.json>}  resolve or reject res base on status.
 */
export const checkResponse = (res) => {
  return CODE_SHOULD_THROW.indexOf(res.status) === -1
    ? Promise.resolve(res.json())
    : Promise.reject(res.json().then(({ errors }) => new ResponseError(errors, res.status)))
}
  
export const checkAjaxResponse = (ajaxResponse) => {

  if (CODE_SHOULD_THROW.indexOf(ajaxResponse.status) !== -1) {
    const errors = pathOr(null, ['xhr', 'response', 'errors'])(ajaxResponse);
    throw ResponseError(errors, ajaxResponse.status);
  }

  return ajaxResponse.response;
}

export const handleAjaxError = (actionType) => (ajaxError) => {
  // [TODO] make sure it's AjaxError
  const { message, request, status, xhr } = ajaxError;
  const unhandledMessage = `
Unexpected ${ajaxError.constructor.name}, please check your server response!
status: \`${status}\`
URL: \`${request.url}\`
message: \`${message}\`
  `;

  return Observable.of({
    type: actionType,
    payload: xhr.response.error 
      || xhr.response.errors
      || xhr.response.message
      || unhandledMessage
  })
}
