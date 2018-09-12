import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";
import React, { forwardRef } from 'react';

function getOptions() {
  return (typeof window !== "undefined" && window.recaptchaOptions) || {};
}

function getURL() {
  const dynamicOptions = getOptions();
  const lang = dynamicOptions.lang ? `&hl=${dynamicOptions.lang}` : "";
  const hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  return `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit${lang}`;
}

const callbackName = "onloadcallback";
const globalName = "grecaptcha";
const initialOptions = getOptions();
const WrappedReCAPTCHA = makeAsyncScriptLoader(getURL, {
  callbackName,
  globalName,
  removeOnUnmount: initialOptions.removeOnUnmount || false
})(ReCAPTCHA)

export default forwardRef((props, ref) => {
  const grecaptcha = window.grecaptcha;
  return grecaptcha
    ? <ReCAPTCHA ref={ref} grecaptcha={grecaptcha} { ...props } />
    : <WrappedReCAPTCHA ref={ref} { ...props } />;
});
