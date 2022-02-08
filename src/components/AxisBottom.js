export const AxisBottom = ({ xScale, innerWidth, innerHeight }) => {
  // ticks for band scale
  const tickValues = xScale.domain().filter(function (d, i) {
    return !(d % 10)
  })

  return (
    <g id="x-axis">
      <line x1="0" x2={innerWidth} y1={innerHeight} y2={innerHeight} stroke="black" />
      {tickValues.map(tick => (
        <g className="tick" key={tick} transform={`translate(${xScale(tick) + xScale.bandwidth() / 2}, 0)`}>
          <line y1={innerHeight + 10} y2={innerHeight} x1="0" x2="0" stroke="black" />
          <text y={innerHeight + 15} dy=".71em" style={{ textAnchor: "middle" }}>
            {tick}
          </text>
        </g>
      ))}
    </g>
  )
}
