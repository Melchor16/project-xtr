const { Op } = require("sequelize");
class APIFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.queryOptions = {};
  }

  filter() {
    const queryObj = { ...this.queryString };
    //excluding this fields bc they are used later
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    //maping operators to then convert the req.paramas to valid sequelize operators
    const operatorsMap = {
      gte: Op.gte,
      gt: Op.gt,
      lte: Op.lte,
      lt: Op.lt,
    };

    //creating where object
    const where = {};

    // mapping columns
    for (const [key, value] of Object.entries(queryObj)) {
      if (typeof value === "object" && value !== null) {
        const conditions = {};
        // mapping values
        for (const [op, val] of Object.entries(value)) {
          if (operatorsMap[op]) {
            conditions[operatorsMap[op]] = Number(val);
          }
        }
        where[key] = conditions;
      } else {
        where[key] = value;
      }
    }

    this.queryOptions.where = where;

    return this;
  }

  async execute() {
    return await this.model.findAll(this.queryOptions);
  }
}

module.exports = APIFeatures;
