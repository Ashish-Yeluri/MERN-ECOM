import React, { useState } from 'react'

import {useNavigate} from 'react-router-dom'

function Search() {
  let [keyword, setKeyword] = useState("")

  let navigate = useNavigate()


  let handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`)
    } else {
      navigate('/')
    }
  }
  
  return (
   <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2 myinput"
        type="search"
        placeholder="Search Products"
        aria-label="Search"
        name='keyword'
        value={keyword}
        onChange={(e)=> setKeyword(e.target.value) }
      />
      
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  )
}

export default Search