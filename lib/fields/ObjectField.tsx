import { defineComponent } from 'vue'
import { useVJSFContext } from '../context'
import { FieldPropsDefine } from '../types'
import { isObject } from '../utils'

// const schema = {
//   type: 'object',
//   properties: {
//     name: {
//       type: 'string',
//     },
//     age: {
//       type: 'number',
//     },
//   },
// }

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleObjectFieldChange = (key: string, val: any) => {
      const value: any = isObject(props.value) ? props.value : {}

      if (val === undefined) delete value[key]
      else value[key] = val

      props.onChange!(value)
    }

    return () => {
      const { schema, rootSchema, value } = props

      const { SchemaItem } = context

      const properties = schema!.properties || {}

      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((key: string, index: number) => (
        <SchemaItem
          key={index}
          schema={properties[key]}
          rootSchema={rootSchema}
          value={currentValue}
          onChange={(val: any) => handleObjectFieldChange(key, val)}
        />
      ))
    }
  },
})
