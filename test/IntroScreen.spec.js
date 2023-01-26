import { mount } from '@vue/test-utils';
import IntroScreen from '@/components/IntroScreen.vue';

describe('IntroScreen', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(IntroScreen);
    expect(wrapper.vm).toBeTruthy();
  });
});
