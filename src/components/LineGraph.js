import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import numeral from "numeral"

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0")
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a")
          },
        },
      },
    ],
  },
}

const buildChartData = (data, casesType) => {
  let previous
  let chartData = []
  if (data) {
    for (let date in data.cases) {
      if (previous) {
        const newPoint = {
          x: date,
          y: data[casesType][date] - previous,
        }
        chartData.push(newPoint)
      }
      previous = data[casesType][date]
    }
    return chartData
  }
}

function LineGraph({ casesType, country }) {
  const [data, setData] = useState([])

  useEffect(() => {
    let url =
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let dat = country === "worldwide" ? res : res.timeline
        setData(buildChartData(dat, casesType))
      })
  }, [casesType, country])

  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              backgroundColor: "rgba(251, 68, 67, 0.5)",
              borderColor: "#fb4443",
              data: data,
            },
          ],
        }}
        options={options}
      />
    </div>
  )
}

export default LineGraph
