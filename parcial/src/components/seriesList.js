import { React, useState, useEffect } from "react";
import Serie from "./serie";
import { FormattedMessage } from "react-intl";
import axios from "axios";

import Grafico from "./grafico";
const SeriesList = () => {
  const [series, setSeries] = useState([]);
  function getBrowserLang() {
    const lang = navigator.language || navigator.userLanguage;
    console.log(lang);
    return lang;
  }

  useEffect(() => {
    var URL = "";
    const lang = getBrowserLang();
    if (lang === "en-US") {
      URL =
        "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";
    } else {
      URL =
        "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";
    }

    const fetchSeries = async () => {
      const { data } = await axios.get(URL);

      setSeries(data);
      localStorage.setItem("series", JSON.stringify(data));
    };
    if (!navigator.onLine) {
      if (localStorage.getItem("series") === null) {
        console.log("Error connecting to API, try again...");
      } else {
        setSeries(JSON.parse(localStorage.getItem("series")));
      }
    } else {
      fetchSeries();
    }
  }, []);

  return (
    <div>
      <div className="row">
        <div id="tab" className="col sm-12 md-12 lg-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">
                  <FormattedMessage id="Name" />
                </th>
                <th scope="col">
                  <FormattedMessage id="Channel" />
                </th>
                <th scope="col">
                  <FormattedMessage id="Description" />
                </th>
              </tr>
            </thead>
            <tbody>
              {series.map((serie) => {
                return <Serie key={serie.id} serie={serie}></Serie>;
              })}
            </tbody>
          </table>
        </div>
      </div>

      {series.length > 0 ? (
        <Grafico
          data={series}
          width={700}
          height={700}
          margin={{ top: 10, left: 100, bottom: 40, right: 10 }}
        />
      ) : null}
    </div>
  );
};

export default SeriesList;
