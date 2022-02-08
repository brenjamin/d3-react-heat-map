const LegendAxis = ({ colorScale, legendWidth }) => {
  const ticks = colorScale.thresholds()
  ticks.unshift(colorScale.domain()[0])
  ticks.push(colorScale.domain()[1])
  return (
    <g id="legend-axis">
      <line x1="0" x2={legendWidth} y1={0} y2={0} stroke="black" />
      {ticks.map((tick, index) => (
        <g className="legend-tick" key={tick} transform={`translate(${(index * legendWidth) / (ticks.length - 1)}, 0)`}>
          <line y1={5} y2={0} x1="0" x2="0" stroke="black" />
          <text y={15} dy=".71em" style={{ textAnchor: "middle" }} className="tick">
            {tick.toFixed(1)}
          </text>
        </g>
      ))}
    </g>
  )
}

const LegendMarks = ({ colorScale, legendWidth }) => {
  const legendMarkHeight = 30
  return (
    <g transform={`translate(0, -${legendMarkHeight})`}>
      {colorScale.range().map((color, index) => {
        return <rect key={index} fill={color} width={legendWidth / colorScale.range().length} height={legendMarkHeight} transform={`translate(${(index * legendWidth) / colorScale.range().length},0)`} />
      })}
    </g>
  )
}

export const Legend = ({ colorScale, margin, height, legendWidth }) => {
  return (
    <g id="legend" transform={` translate(${margin.left},${height - margin.bottom / 4})`}>
      <LegendAxis colorScale={colorScale} legendWidth={legendWidth} />
      <LegendMarks colorScale={colorScale} legendWidth={legendWidth} />
    </g>
  )
}
