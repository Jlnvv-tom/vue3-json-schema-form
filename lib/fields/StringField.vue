<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup="props">
// import { ref } from 'vue'
import { FieldPropsDefine, Schema } from '../types'
export default {
  props: FieldPropsDefine,
}

declare const props: {
  value: any
  onChange: (val: string) => void
  schame: Schema
}

export const handleChange = (e: any) => {
  console.log(e)
  props.onChange(e.target.value)
}
</script>
