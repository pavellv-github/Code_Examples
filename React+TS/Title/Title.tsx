import React from 'react'

import { TTitle } from './types/titleTypes'
import { TitleView } from './view/TitleView'

/** Universal ___Title___ component */
const Title: TTitle.FC = React.memo((props) => <TitleView {...props} />)

Title.displayName = 'Title'

export { Title }
