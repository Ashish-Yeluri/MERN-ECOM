import {useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPriceQueryParams } from '../../helpers/helpers'
import { PRODUCTS_CATEGORIES } from '../../constants/constants'
import StarRatings from 'react-star-ratings';
let Filters = () => {

 let [minValue, setMinvalue] = useState()
  let [maxValue, setMaxvalue] = useState()
  
  let [searchParams] = useSearchParams()
  let navigate = useNavigate()
  
  useEffect(() => {
    searchParams.has('min') && setMinvalue(searchParams.get('min'))
    searchParams.has('man') && setMaxvalue(searchParams.get('max'))
  }, [])

  let handlePriceFilter = (e) => {
    
  console.log('hello')
    e.preventDefault()
   searchParams = getPriceQueryParams(searchParams, "min", minValue)
   searchParams = getPriceQueryParams(searchParams, "max", maxValue)
    
    let path = window.location.pathname + "?" + searchParams.toString()
    
    navigate(path)
    
  }

  let handleCategoryFilters = (checkbox) => {
    let checkBoxes = document.getElementsByName(checkbox.name)
    console.log(checkBoxes)
    checkBoxes.forEach((item) => {
      if(item !== checkbox) item.checked = false
    })

    if (checkbox.checked === false) {
      //delete category filter from query
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name)
         
        let path = window.location.pathname + "?" + searchParams.toString()
         navigate(path)
      }
    } else {
      //set new category filters if already there
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value)
      } else {
        //append new filter
        searchParams.append(checkbox.name, checkbox.value)
      }
      let path = window.location.pathname + "?" + searchParams.toString()
      navigate(path)
    }
  }

  let defaultCheckHandler = (checkboxType, checkboxValue) => {
    let value = searchParams.get(checkboxType)
    if (checkboxValue === value) return true
    return false
    
  }
  

  return (
    <div class="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 class="filter-heading mb-3">Price</h5>
      <form onSubmit={handlePriceFilter}>
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Min ($)"
              name="min"
              value={minValue}
              onChange={(e)=> setMinvalue(e.target.value)}
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Max ($)"
              name="max"
              value={maxValue}
              onChange={(e)=> setMaxvalue(e.target.value)}
            />
          </div>
          <div class="col">
            <button type="submit" class="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 class="mb-3">Category</h5>

      {
        PRODUCTS_CATEGORIES.map((category) => {
        return <div class="form-check">
         <input
          class="form-check-input"
          type="checkbox"
          name="category"
          value={category}
          defaultChecked = {defaultCheckHandler('category', category)}
          onClick={(e)=>handleCategoryFilters(e.target)}
          
        />
          <label class="form-check-label" for="check4">{category}</label>
      </div>
        })
      }

     
     

      <hr />
      <h5 class="mb-3">Ratings</h5>
      {
        [5, 4, 3, 2, 1].map((rating) => {
         return  <div class="form-check">
         <input
          class="form-check-input"
          type="checkbox"
          name="ratings"
          value={rating}
          defaultChecked = {defaultCheckHandler('ratings', rating.toString())}
          onClick={(e)=>handleCategoryFilters(e.target)}
        />
        <label class="form-check-label" for="check7">
          <StarRatings
          rating={rating}
          starRatedColor="gold"
          numberOfStars={5}
          name='rating'
          starDimension='22px'
          starSpacing='1px'
        />
        </label>
      </div>
        })
      }
     
     
    </div>)
}

export default Filters