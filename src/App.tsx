import { defineComponent, ref, Ref } from 'vue'
import { createUseStyles } from 'vue-jss'
import MonacaEditor from './components/MonacaEditor'

function toJson(date: any) {
  return JSON.stringify(date, null, 2)
}

const schema = {
  type: 'string',
}

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
})

export default defineComponent({
  setup() {
    const schemaRef: Ref<any> = ref(schema)

    const handleCodeChange = (code: string) => {
      let schema: any
      try {
        schema = JSON.parse(code)
      } catch (err) {
        schemaRef.value = schema
      }
    }

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value
      const code = toJson(schemaRef.value)
      return (
        <div>
          <MonacaEditor
            code={code}
            onChange={handleCodeChange}
            title="Schema"
            class={classes.editor}
          ></MonacaEditor>
        </div>
      )
    }
  },
})
