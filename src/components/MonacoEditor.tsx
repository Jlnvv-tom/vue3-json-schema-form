import {
  defineComponent,
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
  shallowRef,
} from 'vue'
import * as Monaco from 'monaco-editor'

import type { PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1,
  },
})

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup(props) {
    // must be shallowRef , if not, editor.getValue() won、t work
    const editorRef = shallowRef()

    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let _prevent_trigger_change_event = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        },
      ))

      _subscription = editor.onDidChangeModelContent((event) => {
        console.log('------->', _prevent_trigger_change_event)
        if (!_prevent_trigger_change_event) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeUnmount(() => {
      if (_subscription) _subscription.dispose()
    })

    watch(
      () => props.code,
      (val) => {
        const editor = editorRef.value
        const model = editor.getModel()
        if (val !== model.getValue()) {
          editor.pushUndoStop()
          _prevent_trigger_change_event = true

          // pushEditOperations says it expects a cursorCumputer,but doesn't seem to need one
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: val,
              },
            ],
          )

          editor.pushUndoStop()
          _prevent_trigger_change_event = false
        }
      },
    )

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  },
})
