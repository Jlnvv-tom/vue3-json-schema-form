import { shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    return () => {
      return h('div', props.msg)
    }
  },
})

beforeEach(() => {
  console.log('before each')
})

afterEach(() => {
  console.log('after each')
})

beforeAll(() => {
  console.log('before All')
})

afterAll(() => {
  console.log('after All')
})

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', (done) => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    // expect(wrapper.text()).toMatch(msg)
    setTimeout(() => {
      // expect(wrapper.text()).toEqual('123')  // 不通过
      expect(wrapper.text()).toMatch(msg)
      done() // 异步测试的时候需要done()，不加done()的话，错误也通过了
    }, 100)
  })
  it('should work ', () => {
    expect(1 + 1).toBe(2)
  })
})
