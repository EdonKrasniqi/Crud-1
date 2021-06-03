import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "./app/layout/styles.css";
import 'react-datepicker/dist/react-datepicker.css';
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import ScrollToTop from "./app/layout/ScrollToTop";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();



ReactDOM.render(
  <Router history={history}>
  <ScrollToTop>
    <App/>
  </ScrollToTop>
  </Router>,
    
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
