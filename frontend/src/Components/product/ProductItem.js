import React from 'react'

import StarRatings from 'react-star-ratings';
import {Link} from 'react-router-dom'

function ProductItem({ product }) {
  console.log(product)
  return (
    <div className="card my-3">
     <img src={product?.images[0].url} className="card-img-top p-1 " alt="..." width="230px" height="150px"></img>
      <div className="card-body">    
        <h5>
          <Link className='link' to={`/product/${product._id}`}>{product.name}</Link>
        </h5>
        
        <StarRatings
          rating={product.ratings}
          starRatedColor="gold"
          numberOfStars={5}
          name='rating'
          starDimension='22px'
          starSpacing='1px'
        />
        <span>{product.ratings }</span>
        <h5>{product.price}</h5>
        <Link to={`/product/${product._id}`} className="card-link bg-dark p-1 border rounded link">Product Info</Link>
          </div>
    </div>
  )
}

export default ProductItem