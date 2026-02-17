import { celebrate, Joi, Segments } from 'celebrate';

const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле "title" должно быть заполнено',
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
      }),
    image: Joi.object().keys({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required().messages({
      'object.base': 'Поле image должно быть объектом с fileName и originalName',
    }),
    category: Joi.string().required(),
    description: Joi.string().optional().allow(''),
    price: Joi.number().optional().allow(null),
  }),
});

export default validateProductBody;
