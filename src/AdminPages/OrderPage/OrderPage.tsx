import { Breadcrumb } from 'antd'
import Index from '.'
import Orders from './components/Orders'

const OrderPage = () => {
  return (
  <>
   <Breadcrumb
            style={{ marginBottom: "16px" }}
            items={[{ title: "Vaidik" }, { title: "Orders" }]}
          />
          <Orders/>
      
  </>
  )
}

export default OrderPage