import { celebrate, Joi, Segments } from 'celebrate';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required()
      .messages({
        'any.only': 'Поле payment должно быть card или online',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Некорректный формат email',
      }),
    phone: Joi.string().required()
      .messages({
        'string.empty': 'Поле phone обязательно',
      }),
    address: Joi.string().required()
      .messages({
        'string.empty': 'Поле address обязательно',
      }),
    total: Joi.number().required()
      .messages({
        'number.base': 'Поле total должно быть числом',
      }),
    items: Joi.array().items(
      Joi.string().pattern(objectIdPattern).messages({
        'string.pattern.base': 'Некорректный формат идентификатора товара',
      }),
    ).min(1).required()
      .messages({
        'array.min': 'Поле items должно быть непустым массивом идентификаторов товаров',
      }),
  }),
});

export default validateOrderBody;
