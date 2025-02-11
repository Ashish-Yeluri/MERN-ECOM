class APIFILTERS {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr
  }
  search() {
    let keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i'
      }
    } : {}
    this.query = this.query.find({ ...keyword });
    return this
  }
  filters() {
    let copyQueryStr = { ...this.queryStr }
    let removeFeild = ['keyword', 'page']
    removeFeild.forEach((ele) => delete copyQueryStr[ele])
    console.log(copyQueryStr)

    let queryStr = JSON.stringify(copyQueryStr)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    console.log(queryStr)

    // this.query = this.query.find(copyQueryStr)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }
  pagination (resPerPage) {
    let currentPage = (Number(this.queryStr.page) || 1)
    console.log(currentPage)
    let skipItems = resPerPage * (currentPage - 1)
    console.log(skipItems)
    this.query = this.query.limit(resPerPage).skip(skipItems)
    console.log(this.query)
    return this
   }
}

module.exports = APIFILTERS