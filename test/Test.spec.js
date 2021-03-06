import { mount } from '@vue/test-utils'
import Banner from '@/components/index/Banner.vue'

describe('Banner', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(Banner)
        expect(wrapper.vm).toBeTruthy()
    })
})
