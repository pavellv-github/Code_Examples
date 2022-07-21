import React, { memo } from 'react'

import { TStatus } from './types/statusTypes'
import { StatusView } from './view/StatusView'

/** Universal ___Status___ component */
const Status: TStatus.FC = memo((props) => <StatusView {...props} />)

Status.displayName = 'Status'

export { Status }
