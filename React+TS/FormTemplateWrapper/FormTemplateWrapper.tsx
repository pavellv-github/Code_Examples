import { utilMemo } from '@vtbl/utils-pkg'
import React from 'react'

import { TFormTemplateWrapper, TFormTemplateWrapperView } from './types/formTemplateWrapperTypes'
import { FormTemplateWrapperView } from './view/FormTemplateWrapperView'

/** Universal ___FormTemplateWrapper___ component */
const FormTemplateWrapper: TFormTemplateWrapper.FC = utilMemo<TFormTemplateWrapper.Props>(() => {
  const viewCallbacks: TFormTemplateWrapperView.Callbacks = {}
  const viewRenderers: TFormTemplateWrapperView.Renderers = {}
  return <FormTemplateWrapperView {...viewCallbacks} {...viewRenderers} />
})

FormTemplateWrapper.displayName = 'FormTemplateWrapper'

export { FormTemplateWrapper }
