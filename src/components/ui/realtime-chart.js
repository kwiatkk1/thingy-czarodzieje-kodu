import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";

export default function RealtimeChart(props) {
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    if (props.data) {
      const newData = temps.slice(-10);
      newData.push({ x: Date.now(), y: props.data.value });
      setTemps(newData);
    }
  }, [props.data]);

  const options = {
    chart: {
      id: "realtime",
      animations: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    // markers: {
    //   size: 0
    // },
    crosshairs: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      labels: { show: true }
      //range: XAXISRANGE,
    },
    yaxis: {
      // min: Math.min(...temps.map(y))
      // max: 100
    },
    legend: {
      show: true
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
  };

  const series = [{
    data: temps.slice()
  }];

  return <Chart options={options} series={series} type="line" height="250" />;
}
