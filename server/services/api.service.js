const http = require('http');
const request = require('request-promise');

module.exports = class ApiService {
  /**
   * Hard-coded base URL
   */
  constructor() {
    this.baseUrl = 'http://redsky.target.com';
    this.basePath = '/v2/pdp/tcin/';
  }

  /**
   * Returns a promise that resolves with the http return from the API (or cache, eventually)
   * @param {int|string} productId 
   * @param {Array} productParams 
   */
  getProduct(productId, productParams = []) {
    /**
     * if cache exists and is not expired, result = that
     * else result is the API http promise
     */
    const result = this.getProductFromApi(productId, productParams);

    return result;
  }

  /**
   * Returns a promise with the return from the API
   * 
   * @param {int} productId 
   * @param {Array} productParams 
   */
  getProductFromApi(productId, productParams = []) {
    const urlParams = this.buildProductParamsString(productParams);
    const finalUrl = this.baseUrl + this.basePath + productId + urlParams;

    const requestOptions = {
      uri: finalUrl,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    };

    return request(requestOptions);
  }

  /**
   * TODO: mutate into something like: '?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics'
   * so, like, '?' + '{key}' + Array.implode(',') or whatever the JS syntax is
   * @param {Array} productParams 
   */
  buildProductParamsString(productParams) {
    return '';
  }
}