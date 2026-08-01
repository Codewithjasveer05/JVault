import Hero from '../Components/Hero.jsx'
import FeaturedProducts from '../Components/FeaturedProducts.jsx'
import CategorySection from '../Components/CategorySection.jsx'
import FeaturesBanner from '../Components/FeatureBanner.jsx'
import SaleBanner from '../Components/SalesBanner.jsx'
import Arrival from '../Components/Arrival.jsx'
import {getProducts} from '../services/shopify.js' 
import { useEffect, useState } from 'react'

const Home = () => {
  const [products, setProducts]  = useState([])
  const [loading, setLoading] = useState(true)

   useEffect(()=>{
  async function loadproducts() {
  try {
     
    const data = await getProducts();
    setProducts(data);
  } finally {
    setLoading(false);
  }
}
    loadproducts();
  },[])
  console.log(products)


  return (
    <>
     <Hero/>
     <CategorySection/>
     <FeaturedProducts products={products} loading={loading}/>
     <FeaturesBanner/>
     <SaleBanner/>
     <Arrival/>
    </>
  )
}

export default Home