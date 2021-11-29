export declare namespace TCarPaymentCardPaymentSchedule {
  /** _[type]_ Props for ___CarPaymentCardPaymentSchedule___ */
  type Props = {
    sheduleInfo: {
      title: String
      description: String
    }[]
  }
  /** _[type]_ Callbacks for ___CarPaymentCardPaymentSchedule___ */
  type Callbacks = TComponent.Callbacks<Props>
  /** _[type]_ Render-props for ___CarPaymentCardPaymentSchedule___ */
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.FC<Props>
}
export declare namespace TCarPaymentCardPaymentScheduleView {
  type Props = {
    sheduleInfo: {
      title: String
      description: String
    }[]
  }

  type Callbacks = TComponent.Callbacks<Props>
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.ViewFC<Callbacks & Renderers>
}
