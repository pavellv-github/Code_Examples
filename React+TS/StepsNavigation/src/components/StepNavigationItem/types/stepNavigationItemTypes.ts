export declare namespace TStepNavigationItem {
  /** _[type]_ Props for ___StepNavigationItem___ */
  type Props = {
    propsNumber: Number
    propsTitle: String
    propsStatus: Number
    propsActivity: Boolean
    propsOnClick: Function
  }
  /** _[type]_ Callbacks for ___StepNavigationItem___ */
  type Callbacks = TComponent.Callbacks<Props>
  /** _[type]_ Render-props for ___StepNavigationItem___ */
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.FC<Props>
}
export declare namespace TStepNavigationItemView {
  type Props = {
    propsNumber: Number
    propsTitle: String
    propsStatus: Number
    propsActivity: Boolean
    propsOnClick: Function
  }

  type Callbacks = TComponent.Callbacks<Props>
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.ViewFC<Props>
}
