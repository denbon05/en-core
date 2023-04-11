import { mount } from '@vue/test-utils';
import HomePage from '@/pages/index.vue';

describe('Home page', () => {
  test('Mount', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.vm).toBeTruthy();
  });
});
