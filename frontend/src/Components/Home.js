import React, { useEffect } from 'react'

import '../App.css'
import { useGetProductsQuery } from '../redux/api/productsApi'
import ProductItem from './product/ProductItem'
import Loader from './layouts/Loader'

import toast from 'react-hot-toast';
import CustomPagination from './layouts/CustomPagination'
import { useSearchParams } from 'react-router-dom'
import Filters from './layouts/Filters'

function Home() {
   let [searchParams] = useSearchParams()

  let page = Number(searchParams.get("page")) || 1
  let keyword = searchParams.get("keyword") || ""

  let min = searchParams.get('min')
  let max = searchParams.get('max')
  let category = searchParams.get('category')
  let ratings = searchParams.get('ratings')

  let param = { page, keyword}

  min !== null && (param.min = min)
  max !== null && (param.max = max)
  category !== null && (param.category = category)
  ratings!== null && (param.ratings = ratings)
  
  let {data, isLoading, isError, error}  = useGetProductsQuery(param)
  console.log(data?.products)
  

  
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message)
    }
  }, [isError])
  
  if (isLoading) {
    return <Loader/>
  }
  
  return (
    <div className='home row m-1'>
      <div className='col-3'>
      <Filters/>
      </div>
      <div className='col-9'>
      <h3  className='my-2'>
        {
          keyword ? `All products based on your seach keyword (${keyword}) : ${data?.products?.length} products` : "Latest products"
         }
        </h3>
        <div className='d-flex'>

      {
        data?.products?.map((product) => {
          return <ProductItem key={product._id} product={product} />
        })
      }
        </div>
     
      </div>

      <div className='d-flex justify-content-center my-4'>
        <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.totalproducts } />
      </div>
      
      </div>
  )
}

export default Home