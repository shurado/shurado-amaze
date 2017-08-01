import { ResponseError } from '../errors';
import { pathOr } from 'ramda';

const CODE_SHOULD_THROW = [400, 401, 500]; // eslint-disable-line no-unused-vars

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
