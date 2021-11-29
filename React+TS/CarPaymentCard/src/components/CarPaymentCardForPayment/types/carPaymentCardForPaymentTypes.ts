export declare namespace TCarPaymentCardForPayment {
  /** _[type]_ Props for ___CarPaymentCardForPayment___ */
  type Props = {
    paymentInfo: {
      descriptionPayment: {
        title: String
        procent?: String
        summa: String
      }[]
      summary: String
    }
  }
  /** _[type]_ Callbacks for ___CarPaymentCardForPayment___ */
  type Callbacks = TComponent.Callbacks<Props>
  /** _[type]_ Render-props for ___CarPaymentCardForPayment___ */
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.FC<Props>
}
export declare namespace TCarPaymentCardForPaymentView {
  type Props = {
    paymentInfo: {
      descriptionPayment: {
        title: String
        procent?: String
        summa: String
      }[]
      summary: String
    }
  }

  type Callbacks = TComponent.Callbacks<Props>
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.ViewFC<Callbacks & Renderers>
}
