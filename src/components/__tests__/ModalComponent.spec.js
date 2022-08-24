import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import { ModalComponent } from '../ModalComponent.vue'

const Component = {
  data() {
    return { active: false }
  },
  template: `<button @click="active = !active">toggle</button>
  <ModalComponent :active="active" @on-close="active = false" labe="modal">modal</ModalComponent>`,
  components: { ModalComponent },
}

const dialogSelector = '[role="dialog"]'

describe('CalendarForm', () => {
  it.skip('is not visible when `active` is false', () => {
    mount(Component).get(dialogSelector).should('not.be.inDOM')
  })

  it.skip('opens dialog when a trigger button is clicked', () => {
    const wrapper = mount(Component)
    wrapper.find('button').trigger('click')
    expect(dialogSelector).should('be.visible')
  })
})
