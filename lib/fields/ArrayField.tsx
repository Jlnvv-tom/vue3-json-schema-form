import { useVJSFContext } from '../context'
import { FieldPropsDefine, Schema } from '../types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberFeild',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleMultiTypeChange = (val: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = val
      props.onChange!(arr)
    }

    return () => {
      const { schema, rootSchema, value } = props
      const SchemaItem = context.SchemaItem
      const isMultiType = Array.isArray(schema!.items)

      if (isMultiType) {
        const items: Schema[] = schema!.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v: any) => handleMultiTypeChange(v, index)}
          />
        ))
      }

      return <div>hello world!</div>
    }
  },
})
