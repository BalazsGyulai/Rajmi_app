import React from 'react'
import Svg, { Path, G } from "react-native-svg";

const menu = () => {
  return (
    <Svg width="90%" height="90%" viewBox="0 0 100 100" fill="none">
        <G id="menu">
          <Path
            id="top"
            d="M86.25 30.5H13.25C10.3505 30.5 8 28.1495 8 25.25C8 22.3505 10.3505 20 13.25 20H86.25C89.1495 20 91.5 22.3505 91.5 25.25C91.5 28.1495 89.1495 30.5 86.25 30.5Z"
            fill="#023047"
          />
          <Path
            id="bottom"
            d="M86.25 80.5H13.25C10.3505 80.5 8 78.1495 8 75.25C8 72.3505 10.3505 70 13.25 70H86.25C89.1495 70 91.5 72.3505 91.5 75.25C91.5 78.1495 89.1495 80.5 86.25 80.5Z"
            fill="#023047"
          />
          <Path
            id="middle"
            d="M86.25 55.5H13.25C10.3505 55.5 8 53.1495 8 50.25C8 47.3505 10.3505 45 13.25 45H86.25C89.1495 45 91.5 47.3505 91.5 50.25C91.5 53.1495 89.1495 55.5 86.25 55.5Z"
            fill="#023047"
          />
        </G>
      </Svg>
  )
}

export default menu