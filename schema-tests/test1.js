const Ajv = require("ajv")

const schema = {
  type: 'string',
  minLength: 10,
}

const ajv = new Ajv()
const validate = ajv.compile(schema)
const valid = validate('jokcy')
if (!valid) console.log(validate.errors);
