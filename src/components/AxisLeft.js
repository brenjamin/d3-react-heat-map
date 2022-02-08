export const AxisLeft = ({ yScale, innerWidth, innerHeight, numToMonth }) => {
  // ticks for band scale
  const tickValues = yScale.domain()

  return (
    <g id="y-axis">
      <line x1="0" x2="0" y1={0} y2={innerHeight} stroke="black" />
      {tickValues.map(tick => (
        <g className="tick" key={tick} transform={`translate(0, ${yScale(tick) + yScale.bandwidth() / 2})`}>
          <line y1={0} y2={0} x1={-10} x2={0} stroke="black" />
          <text x={-50} dy=".35em" style={{ textAnchor: "middle" }}>
            {numToMonth(tick)}
          </text>
        </g>
      ))}
    </g>
  )
}
