class APIFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.queryOptions = this.queryOptions;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.queryOptions.where = JSON.parse(queryStr);
    return this;
  }

  async execute() {
    return await this.model.findAll(this.queryOptions);
  }
}

module.exports = APIFeatures;
