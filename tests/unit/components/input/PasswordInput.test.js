import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import PasswordInput from '@/components/input/PasswordInput.vue';

const createComponent = () => mount(PasswordInput, { props: { label: 'Password' } });

describe('PasswordInput.vue', () => {
  it('mounts correctly', () => {
    const wrapper = createComponent();
    expect(wrapper).toBeTruthy();
  });

  it('displays password visibility button', () => {
    const wrapper = createComponent();
    expect(wrapper.find('[data-spec="password-button"]').exists()).toBeTruthy();
  });

  it('displays correct label', () => {
    const wrapper = createComponent();
    expect(wrapper.find('label').text()).toMatch('Password');
  });

  describe('when password visibility button is clicked', () => {
    it('shows password the first time', async () => {
      const wrapper = createComponent();
      const button = wrapper.find('[data-spec="password-button"]');
      await button.trigger('click');
      expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
    });

    it('hides password the second time', async () => {
      const wrapper = createComponent();
      const button = wrapper.find('[data-spec="password-button"]');
      await button.trigger('click');
      await button.trigger('click');
      expect(wrapper.find('input[type="password"]').exists()).toBeTruthy();
    });
  });
});
