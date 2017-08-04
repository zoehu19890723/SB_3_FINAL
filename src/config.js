export const assetsPublicPath = process.env.NODE_ENV === 'development' ?'':window.location.pathname.replace('index.html','');//build发布修改名称为对应的根目录下/epPortal/
export const API_ROOT = process.env.NODE_ENV === 'development' ? 'http://epsdemo.cdpyun.com/':'http://demo.cdpyun.com/';//新路径http://epsdemo.cdpyun.com/
export const imgsPath = 'http://star-test.cdpyun.com//';
export const CookieDomain = (process.env.NODE_ENV === 'production') ? '.cdpyun.com' :'';

const APP_ENV={
  TEST :{
    ENV:'TEST',
    RequestProtocol:'http://',
    IDP:'http://idp-test.cdpyun.com/idp-oauth2/authorizeApp?client_id=wxbe7a059a6171fc9e&response_type=code&redirect_uri=http://test.cdpyun.com/?sso=IDP',
    EP:'test.cdpyun.com/',
    SETTING_PWD:'http://idp-test.cdpyun.com/idp-oauth2/flow/passwordSetFlow.d',
    WS:'http://star-test.cdpyun.com/ws.php',
    WSIMG:'http://star-test.cdpyun.com',
    APP_CONFIG:'https://wespark.cdpcloud.com/download/appConfig.json',
    DOWNLOAD_LOAD:{
      ANDROID:'https://wespark.cdpcloud.com/download/CDPportal_TEST.html',
      IOS:'https://wespark.cdpcloud.com/download/CDPportal_TEST.html'
    }
  },
  UAT :{
    ENV:'UAT',
    RequestProtocol:'http://',
    IDP:'http://idp-uat.cdpyun.com/idp-oauth2/authorizeApp?client_id=wxbe7a059a6171fc9e&response_type=code&redirect_uri=http://uat.cdpyun.com/?sso=IDP',
    EP:'uat.cdpyun.com/',
    SETTING_PWD:'http://idp-uat.cdpyun.com/idp-oauth2/flow/passwordSetFlow.d',
    WS:'http://star-uat.cdpyun.com/ws.php',
    WSIMG:'http://star-uat.cdpyun.com',
    APP_CONFIG:'http://test.cdpyun.com/env/appConfig.json',
    DOWNLOAD_LOAD:{
      ANDROID:'https://wespark.cdpcloud.com/download/CDPportal_UAT.html',
      IOS:'https://wespark.cdpcloud.com/download/CDPportal_UAT.html'
    }
  },
  PROD :{
    ENV:'PROD',
    RequestProtocol:'https://',
    IDP:'https://idp.cdpyun.com/idp-oauth2/authorizeApp?client_id=wxbe7a059a6171fc9e&response_type=code&redirect_uri=https://cdpyun.com/?sso=IDP',
    EP:'cdpyun.com/',
    SETTING_PWD:'https://idp.cdpyun.com/idp-oauth2/flow/passwordSetFlow.d',
    WS:'https://star.cdpyun.com/ws.php',
    WSIMG:'https://star.cdpyun.com',
    APP_CONFIG:'https://wespark.cdpcloud.com/download/appConfig.json',
    DOWNLOAD_LOAD:{
      ANDROID:'https://wespark.cdpcloud.com/download/CDPportal.html',
      IOS:'https://wespark.cdpcloud.com/download/CDPportal.html'
    }
  },
  STORE :{
    ENV:'STORE',
    RequestProtocol:'https://',
    IDP:'https://idp.cdpyun.com/idp-oauth2/authorizeApp?client_id=wxbe7a059a6171fc9e&response_type=code&redirect_uri=https://cdpyun.com/?sso=IDP',
    EP:'cdpyun.com/',
    SETTING_PWD:'https://idp.cdpyun.com/idp-oauth2/flow/passwordSetFlow.d',
    WS:'https://star.cdpyun.com/ws.php',
    WSIMG:'https://star.cdpyun.com',
    APP_CONFIG:'https://wespark.cdpcloud.com/download/appConfig.json',
    DOWNLOAD_LOAD:{
      ANDROID:'http://a.app.qq.com/o/simple.jsp?pkgname=com.cdp.epPortal',
      IOS:'https://itunes.apple.com/us/app/cdp-portal/id1197950581?l=zh&ls=1&mt=8'
    }
  }
}

export const APP_ENV_NOW = APP_ENV.TEST;

export const appVersion = '1.7.1.0';
