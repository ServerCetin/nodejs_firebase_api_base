class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    this.queryString.filter?.map(query => { this.query = this.query.where(query.key, query.expression, query.value)})
    return this;
  }

  sort() { // TODO we cannot order by attributes except id due to same value problem, we should change this func for sorting all attrbs

    // if (this.queryString.sort) {
    //   const sortBy = this.queryString.sort.split(",");
    //   sortBy.forEach((field) => {
    //     this.query = this.query.orderBy(field);
    //   });
    // }
    this.query = this.query.orderBy('id')

    return this;
  }

  paginate() {
    const limit = this.queryString.paginate.limit || 100;
    const startingIndex = this.queryString.paginate.startingIndex

    if(startingIndex != null){
      this.query = this.query.startAfter(this.queryString.paginate.startingIndex).limit(limit)
    }else {
      this.query = this.query.limit(limit)
    }

    return this;
  }
}
module.exports = APIFeatures;
