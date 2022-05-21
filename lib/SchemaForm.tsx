import { defineComponent, PropType, provide } from 'vue'
import { Schema, SchemaTypes } from './types'
import SchemaItems from './SchemaItems'
import { SchemaFormContextKey } from './context'

type A = typeof SchemaItems

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(value: any) => void>,
    },
  },
  name: 'SchemaForm',
  setup(props, { slots, emit, attrs }) {
    console.log(props)
    const handleChange = (value: any) => {
      props.onChange!(value)
    }

    const context = {
      SchemaItems,
    }

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props

      return (
        <SchemaItems
          schema={schema}
          rootSchema={schema!}
          value={value}
          onChange={handleChange}
        />
      )
    }
  },
})
