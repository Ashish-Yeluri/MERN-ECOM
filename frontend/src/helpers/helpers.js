

export let getPriceQueryParams = (searchParams, key, value) => {

  let hasKeyInSearchParams = searchParams.has(key)

  if (value && hasKeyInSearchParams) {
    searchParams.set(key, value) //update 
  } else if (value) {
    searchParams.append(key, value) //append
  } else if (searchParams) {
    searchParams.delete(key) //delete
  }

 return searchParams
  
}