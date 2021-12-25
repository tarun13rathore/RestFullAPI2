const Joi = require("joi");

const studentSchemaValid = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  address: Joi.string().required(),
  avatar: Joi.string(),
});

module.exports = studentSchemaValid;
