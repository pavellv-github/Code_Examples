import React, { memo } from 'react'

import { Container, Error, Label, Message } from './FormItem.styled'
import { TFormItem } from './types/formItemTypes'

/** Universal ___FormItem___ component */
const FormItem: TFormItem.FC = memo((props) => {
  const { children, className, error, label, message } = props
  const dataTestid = props['data-testid']

  return (
    <Container className={className}>
      {label && <Label data-testid={dataTestid ? `${dataTestid}_label` : undefined}>{label}</Label>}
      <div data-testid={dataTestid ? `${dataTestid}_value` : undefined}>{children}</div>
      {message && !error && <Message data-testid={dataTestid ? `${dataTestid}_message` : undefined}>{message}</Message>}
      {error && <Error data-testid={dataTestid ? `${dataTestid}_error` : undefined}>{error}</Error>}
    </Container>
  )
})

FormItem.displayName = 'FormItem'

export { FormItem }
