import { TCarPaymentCardForPayment } from "../components/CarPaymentCardForPayment"
import { TCarPaymentCardHeader } from "../components/CarPaymentCardHeader"
import { TCarPaymentCardPaymentSchedule } from "../components/CarPaymentCardPaymentSchedule"
export declare namespace TCarPaymentCard {
  /** _[type]_ Props for ___CarPaymentCard___ */
  type Props = {
    propsData: {
      picture: String
      title: String
      summa: String
      location: String
      date_of_issue: String
      payment: {
        descriptionPayment: {
          title: String
          procent?: String
          summa: String
        }[]
        summary: String
      }
      shedule: {
        title: String
        description: String
      }[]
      offer: String
    }
    propsHeader: TCarPaymentCardHeader.Props
    propsPayment: TCarPaymentCardForPayment.Props
    propsShedule: TCarPaymentCardPaymentSchedule.Props
    handlerClick: Function
  }
  /** _[type]_ Callbacks for ___CarPaymentCard___ */
  type Callbacks = TComponent.Callbacks<Props>
  /** _[type]_ Render-props for ___CarPaymentCard___ */
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.FC<Props>
}
export declare namespace TCarPaymentCardView {
  type Props = {
    propsData: {
      picture: String
      title: String
      summa: String
      location: String
      date_of_issue: String
      payment: {
        descriptionPayment: {
          title: String
          procent?: String
          summa: String
        }[]
        summary: String
      }
      shedule: {
        title: String
        description: String
      }[]
      offer: String
    }
    propsHeader: TCarPaymentCardHeader.Props
    propsPayment: TCarPaymentCardForPayment.Props
    propsShedule: TCarPaymentCardPaymentSchedule.Props
    handlerClick: Function
  }

  type Callbacks = TComponent.Callbacks<Props>
  type Renderers = TComponent.Renderers<Props>

  type FC = TComponent.ViewFC<Props>
}
