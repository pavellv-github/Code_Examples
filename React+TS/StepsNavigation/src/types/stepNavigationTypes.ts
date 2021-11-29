export declare namespace TStepNavigation {
  /** _[type]_ Props for ___StepNavigation___ */
  type Props = {
    propsList: { id: Number, title: String }[]
    propsCurrentStep: Number
    propsHandlerChange: Function
  }
  /** _[type]_ Callbacks for ___StepNavigation___ */
  type Callbacks = TComponent.Callbacks<Props>
  /** _[type]_ Render-props for ___StepNavigation___ */
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.FC<Props>
}

export declare namespace TStepNavigationView {
  type Props = {
    propsList: { id: Number, title: String }[]
    propsCurrentStep: Number
    propsHandlerChange: Function
  }

  type Callbacks = TComponent.Callbacks
  type Renderers = TComponent.Renderers

  type FC = TComponent.ViewFC<Callbacks & Renderers>
}
