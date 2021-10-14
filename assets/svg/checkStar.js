import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      height={32}
      width={32}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 53.867 53.867"
      {...props}
    >
      <Path
        fill="#efce4a"
        d="M26.934 1.318l8.322 16.864 18.611 2.705L40.4 34.013l3.179 18.536-16.645-8.751-16.646 8.751 3.179-18.536L0 20.887l18.611-2.705z"
      />
    </Svg>
  )
}

export default SvgComponent
