import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ReCAPTCHA from "../src/recaptcha-wrapper";

const VALUE = "some value";
const WIDGET_ID = "someWidgetId";

const grecaptchaMock = {
  render(node, options) {
    expect(node).toBeTruthy();
    expect(options).toBeTruthy();
    return WIDGET_ID;
  },

  getResponse(widgetId) {
    expect(widgetId).toBe(WIDGET_ID);
    return VALUE;
  },
};

describe("ReCAPTCHAWrapper", () => {
  it("should be wrapped properly", () => {
    expect(ReCAPTCHA.render().type.displayName).toBe("AsyncScriptLoader(ReCAPTCHA)");
  });
  it("should proxy functions", () => {
    window.grecaptcha = grecaptchaMock;
    const ReCaptchaRef = React.createRef();
    ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" ref={ReCaptchaRef} onChange={jest.fn()} />,
    );
    expect(ReCaptchaRef.current.getValue()).toBe(VALUE);
    delete window.grecaptcha;
  });
});
