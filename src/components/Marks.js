export const Marks = ({ data, xScale, xValue, yScale, yValue, tempValue, colorScale, onMouseOver, onMouseOut }) => {
  return (
    <g>
      {data.map((dataPoint, index) => {
        return <rect key={index} x={xScale(xValue(dataPoint))} y={yScale(yValue(dataPoint))} width={xScale.bandwidth()} height={yScale.bandwidth()} fill={colorScale(tempValue(dataPoint))} data-temp={tempValue(dataPoint)} onMouseOver={e => onMouseOver(e, index)} onMouseOut={e => onMouseOut(e)} className="cell" data-year={dataPoint.year} data-month={dataPoint.month - 1} />
      })}
    </g>
  )
}
