import { Breadcrumb } from 'antd'
import React from 'react'

const OrderPage = () => {
  return (
  <>
   <Breadcrumb
            style={{ marginBottom: "16px" }}
            items={[{ title: "Vaidik" }, { title: "Orders" }]}
          />
  </>
  )
}

export default OrderPage