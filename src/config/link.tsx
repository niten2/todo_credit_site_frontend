import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { withPublicUrl } from 'src/config/settings'

interface P {
  to: string
  children: any
  className?: string
  activeClassName?: string
}

export default (props: P): any => {
  const { to, className, activeClassName } = props

  return (
    <NavLink
      to={withPublicUrl(to)}
      className={className}
      activeClassName={activeClassName}
    >
      {props.children}
    </NavLink>
  )
}
