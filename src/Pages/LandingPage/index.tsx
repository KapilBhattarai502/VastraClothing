
import { CallToAction } from './components/CallToAction'
import { Introduction } from './components/Introduction'
import { Hero } from './components/Hero'
import { ProductCategories } from './components/ProductCategories'
import { WhyChooseUs } from './components/WhyChooseUs'
import { Testimonials } from './components/Testimonials'

const index = () => {
  return (
    <>
    <Hero/> 
    <Introduction/>
    <ProductCategories/>
    <Testimonials/>
    <WhyChooseUs/>

    </>
  )
}

export default index