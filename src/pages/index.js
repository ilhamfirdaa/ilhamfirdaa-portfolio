import React from 'react'
import { Link } from 'gatsby'

const index = () => (
  <div>
    <ul>
      <li>
        {/* <a href="prayer">Prayer Time</a> */}
        <Link to="prayer">Prayer Time</Link>
      </li>
      <li>
        {/* <a href="weather">Weather Forecast</a> */}
        <Link to="weather">Weather Forecast</Link>
      </li>
    </ul>
  </div>
)

export default index
