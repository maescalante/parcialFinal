import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { FormattedMessage, IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
function getBrowserLang() {
  const lang = navigator.language || navigator.userLanguage;

  return lang;
}

function getLocale() {
  const lang = getBrowserLang();
  if (lang === "en-US") {
    return localeEnMessages;
  } else {
    return localeEsMessages;
  }
}
ReactDOM.render(
  <IntlProvider locale={getBrowserLang()} messages={getLocale()}>
    <React.StrictMode>
      <div className="container">
        <nav className="navbar  ">
          <b>
            <FormattedMessage id="Title" />
          </b>
        </nav>

        <App />
      </div>
    </React.StrictMode>
  </IntlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
