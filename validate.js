const validateHooks = require('./common/ValidationHook');

const yup = require('yup');

let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});


/*
const validate = async (body) => {
    const val = await schema.isValid(body).catch(ex =>
    {
        console.log(ex.message);
    });
    if (val)
        console.log('Valid');
}
validate({ name: 'jimmy', age: 12 });
*/