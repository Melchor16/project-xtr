const { Op } = require("sequelize");
class APIFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.queryOptions = {};
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    return this;
  }

  async execute() {
    return await this.model.findAll(this.queryOptions);
  }
}

module.exports = APIFeatures;
