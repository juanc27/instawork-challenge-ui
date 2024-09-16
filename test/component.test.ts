import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MemberItem from '../src/components/MemberItem.vue'

describe('component of MemberItem.vue', () => {
  it('should render', () => {
    const wrapper = mount(MemberItem, { props: { id: 1, firstName: 'John', lastName: 'Doe', email: 'test@test.com', phone: '1234567890', role: 'admin' } })
    expect(wrapper.text()).toContain('Name: John Doe (admin)')
    expect(wrapper.text()).toContain('Email: test@test.com')
    expect(wrapper.text()).toContain('Phone: 1234567890')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
