export default {
  name: 'Demo',
  schema: {
    type: 'array',
  },
  uiSchema: {},
  default: {
    staticArray: {
      type: 'array',
      items: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
    },
    singleTypeArray: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          age: {
            type: 'number',
          },
        },
      },
    },
  },
}
