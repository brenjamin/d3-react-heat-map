import "./App.css"
import React from "react"
import { scaleQuantize, max, min, scaleBand, schemeRdYlBu } from "d3"
import { useData } from "./utils/useData"
import { Marks } from "./components/Marks"
import { Legend } from "./components/Legend"
import { Tooltip } from "./components/Tooltip"
import { AxisBottom } from "./components/AxisBottom"
import { AxisLeft } from "./components/AxisLeft"

const width = 1500
const height = 700
const margin = { top: 50, bottom: 150, left: 120, right: 20 }
const legendWidth = width / 3

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const xValue = d => d.year
const yValue = d => d.month

const numToMonth = num => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return months[num - 1]
}

const App = () => {
  let data = useData()

  if (!data) {
    return <pre>Loading...</pre>
  }

  const baseTemp = data.baseTemperature
  data = data.monthlyVariance

  const tempValue = d => d.variance + baseTemp

  const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth])

  const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight])

  const colorScale = scaleQuantize()
    .domain([min(data, tempValue), max(data, tempValue)])
    .range(schemeRdYlBu[11].slice().reverse())

  const handleMouseOver = (e, index) => {
    e.target.setAttribute("stroke", "black")
    const tooltip = document.querySelector("#tooltip")

    const dataPoint = data[index]
    const x = parseInt(e.target.getAttribute("x")) + 60
    const y = parseInt(e.target.getAttribute("y")) - 50
    tooltip.style.transform = `translate(${x}px, ${y}px)`
    tooltip.innerHTML = `${numToMonth(dataPoint.month)} ${dataPoint.year}<br/>${(dataPoint.variance + baseTemp).toFixed(1)}&deg;C<br/>${Math.sign(dataPoint.variance) > 0 ? "+" : ""}${dataPoint.variance.toFixed(1)}&deg;C`
    tooltip.dataset.year = dataPoint.year
    tooltip.style.opacity = 1
    tooltip.style.visibility = "visible"
  }

  const handleMouseOut = e => {
    e.target.setAttribute("stroke", "transparent")
    const tooltip = document.querySelector("#tooltip")
    tooltip.style.opacity = 0
    tooltip.style.visibility = "hidden"
  }

  return (
    <main>
      <div className="svg-wrapper">
        <Tooltip />
        <svg width={width} height={height}>
          <text stroke="black" x={width / 2} y={margin.top / 3} id="title" textAnchor="middle">
            <tspan>Monthly Global Land-Surface Temperature</tspan>
            <tspan id="description" className="title-small" x={width / 2} dy="1.2em">
              1753 - 2015: Base temperature of {baseTemp}&deg;C
            </tspan>
          </text>
          <text transform={`translate(${margin.left - 100}, ${innerHeight / 2}) rotate(-90)`} textAnchor="middle">
            Months
          </text>
          <text transform={`translate(${width / 2}, ${height - margin.bottom / 2})`} textAnchor="middle">
            Year
          </text>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom xScale={xScale} innerWidth={innerWidth} innerHeight={innerHeight} />
            <AxisLeft yScale={yScale} innerWidth={innerWidth} innerHeight={innerHeight} numToMonth={numToMonth} />
            <Marks data={data} xScale={xScale} xValue={xValue} yScale={yScale} yValue={yValue} tempValue={tempValue} colorScale={colorScale} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
          </g>
          <Legend colorScale={colorScale} margin={margin} height={height} legendWidth={legendWidth} />
        </svg>
      </div>
    </main>
  )
}

export default App
