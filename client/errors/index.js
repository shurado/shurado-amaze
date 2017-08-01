
/**
 * ResponseError
 * 
 * 當回應代碼不為 200, 300 等正常代碼時拋出，代表請求有誤。
 */
export class ResponseError extends Error {
  constructor(message, status = 500) {
    super();
    this.name = 'ResponseError';
    this.message = message || '';
    this.status  = 500;
  }
}

export class NotImplmentedError extends Error {
  constructor(message) {
    super();
    this.name = 'NotImplmentedError';
    this.message = message || `Sorry, but this method is not yet implmented.`;
  } 
}

export class FatalError extends Error {
  constructor(message) {
    super();
    this.name = 'FatalError';
    this.message = message || '';
  } 
}

export class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'NotFoundError';
    this.message = message || '';
  }  
}
