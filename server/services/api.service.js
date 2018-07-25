const http = require('http');
const request = require('request');

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
  getProductTitle(productId, productParams = []) {
    /**
     * if cache exists and is not expired, result = that
     * else result is the API http promise
     */
    result = this.getProductTitleFromApi(productId, productParams);

    return result;
  }

  /**
   * Returns a promise with the return from the API
   * 
   * @param {int} productId 
   * @param {Array} productParams 
   */
  getProductTitleFromApi(productId, productParams = []) {
    const urlParams = this.buildProductParamsString(productParams);
    const finalUrl = this.baseUrl + this.basePath + productId;
    let result = '';

    request(finalUrl, (error, response, body) => {
      console.log(error);
      console.log(response);
      console.log(body);
    
    });
    // http.get({
    //   host: this.baseUrl,
    //   // port: 80,
    //   path: this.basePath + productId
    // }, (response) => {
    //   // console.log(response);
    //   response.on('data', function(data) {
    //     result += data;
    //   });

    //   response.on('end', () => {
    //     return result;
    //   });
    // });
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