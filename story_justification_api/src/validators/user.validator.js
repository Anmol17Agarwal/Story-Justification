import Joi from 'joi';

export default {
  createSuperUser: Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};
