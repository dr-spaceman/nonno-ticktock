import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

const Component = {
  template: `<div>{{ msg || 'foo' }}</div>`,
  props: ['msg'],
}

const Component2 = {
  template: `<button @click="$emit(handleClick)">{{msg}}</button>`,
  data() {
    return {
      msg: 'foo',
    }
  },
  methods: {
    handleClick() {
      this.msg = 'bar'
    },
  },
}

describe('Foo', () => {
  it('renders foo', () => {
    const wrapper = mount(Component)
    expect(wrapper.text()).toContain('foo')
  })

  it('renders bar', () => {
    const wrapper = mount(Component, {
      propsData: {
        msg: 'aBC',
      },
    })
    expect(wrapper.text()).toBe('aBC')
  })

  it('handles emits', () => {
    const fn = vi.fn()
    const wrapper = mount(Component2)
    wrapper.find('button').trigger('click')
    expect(wrapper.text()).toBe('bar')
  })
})
