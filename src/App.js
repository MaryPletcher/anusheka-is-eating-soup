import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ControlPanelPage from "./pages/ControlPanelPage";
import BirthdayMessagePage from "./pages/BirthdayMessagePage";
import styles from './App.css';
function App() {
  return (
    <div className = {styles.appWrap}>
    {/* <style type = "text/css">
      html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin:0; padding:0; border:0; font-size:100%; font:inherit; vertical-align:baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    </style> */}
    <Router>
      <Routes>
        {/* homepage */}
        <Route path="/" element={<Home />} />

        {/* control panel page */}
        <Route path="/ControlPanelPage" element={<ControlPanelPage />} />

        {/* birthday message page */}
        <Route path="/BirthdayMessagePage" element={<BirthdayMessagePage />} />
        {/* individual drop page (dynamic route) */}
        {/* <Route path="/drops/:id" element={<DropPage />} /> */}

      </Routes>
    </Router>
    </div>
  );
}

export default App;
