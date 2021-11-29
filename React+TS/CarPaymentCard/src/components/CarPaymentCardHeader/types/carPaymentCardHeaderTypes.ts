export declare namespace TCarPaymentCardHeader {
  /** _[type]_ Props for ___CarPaymentCardHeader___ */
  type Props = {
    picture: String
    title: String
    summa: String
    location: String
    date: String
  }
  /** _[type]_ Callbacks for ___CarPaymentCardHeader___ */
  type Callbacks = TComponent.Callbacks<Props>
  /** _[type]_ Render-props for ___CarPaymentCardHeader___ */
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.FC<Props>
}
export declare namespace TCarPaymentCardHeaderView {
  type Props = {
    picture: String
    title: String
    summa: String
    location: String
    date: String
  }

  type Callbacks = TComponent.Callbacks<Props>
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.ViewFC<Callbacks & Renderers>
}
