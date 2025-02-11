import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../redux/api/productsApi'
import StarRatings from 'react-star-ratings';
import toast from 'react-hot-toast';

import '../../App.css'
import Loader from '../layouts/Loader';

function ProductDetails() {
  let params = useParams()

  let { data, isLoading, isError, error } = useGetProductDetailsQuery(params?.id)
  let product = data?.product



  let [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    setActiveImage(product?.images[0] ? product?.images[0]?.url : "")
    
  }, [product])

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message)
    }
  }, [isError])
  
  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className='container border'>
     
      <div className="row mt-4 border border-danger">
        <div className='col-6 p-4'>
          <div>
            <img src={activeImage} alt="" width="470px" height="400px"/>
          </div>
          <div className='row mt-4'>
            {
              product?.images?.map((image) => {
               return <div className='col-4'>
                       <img src={image?.url} alt="" width="100px" height="100px" className={`${activeImage === image?.url ? "border border-4 border-info" : ""}`}
                        onMouseOver={()=>setActiveImage(image?.url)}
                 />
                      </div>
              })
            }
          </div>
        </div>
         <div className='col-6  border border-danger p-4'>
          <div className='d-flex'>
          <div>
            <h4>{product?.name}</h4>
            <p>id: {product?._id}</p>
           <hr />
          <div>
            <h4> Price: {product?.price}</h4>
          </div>
          </div>
          </div>
          <div className='d-flex'>
            <span class="badge text-bg-primary m-2">-</span>
            <span>1</span>
            <span class="badge text-bg-secondary m-2">+</span>
            <button class="btn btn-warning m-2">Add to cart</button>
          </div>
          <hr />
          <div>
            <div>
              <span>
                Status:
              </span>
              <span className={`${product?.stock > 0 ? "greenColor" : "redColor"}`}> {
               product?.stock > 0  ? "In stock": "Out of stock"
              } </span>
            </div>
        <StarRatings
          rating={product?.ratings}
          starRatedColor="gold"
          numberOfStars={5}
          name='rating'
          starDimension='22px'
          starSpacing='1px'
            />
            <span className='m-3'>{product?.ratings}</span>
            <span>(Reviews): ({product?.noOfReviews})</span>
          </div>
          <div className='my-3'>
            <h6>Category: {product?.category}</h6>
          </div>
          <div className='my-3'>
            <h6>Seller: {product?.seller}</h6>
          </div>
          <div>
            <p>  <h6> Description:</h6>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita animi voluptatum earum voluptas quaerat odio similique, rem id voluptatibus molestiae perspiciatis temporibus inventore ex fugiat nihil quis velit laudantium sequi aspernatur consectetur dolorum? Quam libero perspiciatis quis aspernatur rem fuga numquam facere id. Esse ipsa obcaecati provident officia, ex rerum!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails