import { cfdata } from 'libs/cfdata';
import { RawCurrentUser } from 'typings/user';

/**
 * @deprecated Use Redux instead!
 * Ok, technically this isn't "deprecated": there are some real use cases for userAttributes,
 * mostly around storing _never-changing_ global API configurations and authentication keys.
 * But for the most part you should really be using Redux for shared data.
 * Talk to Web Platform if you want to use this. :)
 */
export const userAttributes = {
  /**
   * @deprecated Use Redux instead!
   * Ok, technically this isn't "deprecated": there are some real use cases for userAttributes,
   * mostly around storing _never-changing_ global API configurations and authentication keys.
   * But for the most part you should really be using Redux for shared data.
   * Talk to Web Platform if you want to use this. :)
   */
  isAdmin() {
    return this._hasRole('admin');
  },

  /**
   * @deprecated Use Redux instead!
   * Ok, technically this isn't "deprecated": there are some real use cases for userAttributes,
   * mostly around storing _never-changing_ global API configurations and authentication keys.
   * But for the most part you should really be using Redux for shared data.
   * Talk to Web Platform if you want to use this. :)
   */
  isAdvisor() {
    return this._hasRole('advisor') || this._hasRole('advisor_candidate');
  },

  /**
   * @deprecated Use Redux instead!
   * Ok, technically this isn't "deprecated": there are some real use cases for userAttributes,
   * mostly around storing _never-changing_ global API configurations and authentication keys.
   * But for the most part you should really be using Redux for shared data.
   * Talk to Web Platform if you want to use this. :)
   */
  isCustomerService() {
    return this._hasRole('customer_service');
  },

  /**
   * @deprecated Use Redux instead!
   * Ok, technically this isn't "deprecated": there are some real use cases for userAttributes,
   * mostly around storing _never-changing_ global API configurations and authentication keys.
   * But for the most part you should really be using Redux for shared data.
   * Talk to Web Platform if you want to use this. :)
   */
  isAuthor() {
    return this._hasRole('author');
  },

  _hasRole(role: string) {
    const roles = this.get('roles') || [];
    return roles.indexOf(role) >= 0;
  },


  isPro() {
    return this.get('pro', false);
  },

 
 

  /**
   * @deprecated Use Redux instead!
   * Ok, technically this isn't "deprecated": there are some real use cases for userAttributes,
   * mostly around storing _never-changing_ global API configurations and authentication keys.
   * But for the most part you should really be using Redux for shared data.
   * Talk to Web Platform if you want to use this. :)
   */
  authenticationToken() {
    const user = this.isAnon()
      ? cfdata['anonymous_user']
      : cfdata['current_user'];
    return user?.authentication_token || '';
  }
}