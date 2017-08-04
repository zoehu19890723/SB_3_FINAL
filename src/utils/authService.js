import Vue from 'vue'
import cookie from 'vue-cookie'
import { CookieDomain } from '../config.js'
let cookieConfig = {}
if(CookieDomain !== ''){
  cookieConfig = { domain: CookieDomain }
}

export function saveCookie(name,value) {
  cookie.set(name, value, cookieConfig);
}

export function getCookie(name) {
  return cookie.get(name);
}

export function removeCookie(name) {
  cookie.delete(name,cookieConfig);
}

export function signOut() {
  cookie.delete('token',cookieConfig);
}

export function isLogin() {
  return !!cookie.get('token');
}
