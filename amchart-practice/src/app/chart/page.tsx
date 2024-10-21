import { useEffect } from "react";
import XYChart from "./_component/XYChart";
import { v4 as uuidv4 } from "uuid";

interface ChartData {
  value: number;
  date: string;
}

const data: ChartData[] = [
  {
    value: 8,
    date: "2018-07-18T12:39:08.000Z",
  },
  {
    value: 40,
    date: "2018-07-17T17:01:13.000Z",
  },

  {
    value: 88,
    date: "2018-07-19T15:47:31.000Z",
  },
  {
    value: 128,
    date: "2018-07-23T11:16:22.000Z",
  },
  {
    value: 4,
    date: "2018-07-20T12:50:56.000Z",
  },
  {
    value: 82,
    date: "2018-07-21T22:11:43.000Z",
  },
  {
    value: 424,
    date: "2018-07-16T07:28:13.000Z",
  },

  {
    value: 316,
    date: "2018-07-24T07:12:02.000Z",
  },
];

const ChartPage = () => {
  const id = uuidv4();
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      ChartPage
      {id && <XYChart id={id} data={data} />}
    </div>
  );
};

export default ChartPage;
