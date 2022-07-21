import React from 'react'

import { TTitleView } from '../types/titleTypes'
import { Wrapper } from './styled'

const TitleView: TTitleView.FC = ({
  as,
  children,
  className,
  margin,
  padding,
  text,
  variant,
  suffix,
  onClick = () => {},
  ...props
}) => {
  const dynamicTitleTag = variant === 'h7' ? 'span' : `${variant.toLocaleLowerCase()}`
  return (
    <Wrapper className={className} {...props} margin={margin} onClick={onClick} padding={padding} variant={variant}>
      {React.createElement(as ? String(as) : dynamicTitleTag, null, children || text)}
      {suffix}
    </Wrapper>
  )
}

TitleView.displayName = 'TitleView'
Wrapper.displayName = 'Wrapper'

export { TitleView }
