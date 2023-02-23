import { mount, createLocalVue, Wrapper } from '@vue/test-utils';
import IntroScreen from '@/components/home/IntroScreen.vue';

const localVue = createLocalVue();

describe('IntroScreen', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(IntroScreen, {
      localVue,
      propsData: {
        smAndDown: false,
      },
    });
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
