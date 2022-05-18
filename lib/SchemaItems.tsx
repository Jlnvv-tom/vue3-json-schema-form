import { defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes } from './types'
import StringFeild from './fields/StringField'
import NumberFeild from './fields/NumberField'

export default defineComponent({
  name: 'SchemaItems',
  props: {
    schema: {
      type: Object as PropType<Schema>,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(val: any) => void>,
      required: true,
    },
  },

  setup(props) {
    return () => {
      const { schema } = props

      // TODO 如果type 没有指定， 我们需要猜测这个type

      const type = schema.type

      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringFeild
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberFeild
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }
      return <Component {...props} />
    }
  },
})
