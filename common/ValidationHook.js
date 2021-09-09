const { useHooks, parseEvent, handleUnexpectedError } = require('lambda-hooks');
const withApiHooks = (lambda, { schema }) =>
useHooks({
    before: [parseEvent, validateEventBody],
    after: [],
    onError: [handleUnexpectedError],
},{
    schema
})(lambda);
const validateEventBody = async state => {
    const { schema  } = state.config;
    if (!schema) {
        throw Error('missing required schema for validation')
    }
    try {
        const { event } = state;
        await schema.validate(event.body, { strict: true });        
    } catch (error) {
        console.log(`yup error validating event.body: ${error}`);
        state.exit = true
        state.response = { statusCode: 400, body: JSON.stringify({ error: error.message }) }
    } 
    return state;
}
module.exports = withApiHooks;