import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HeaderComponent from '../HeaderComponent.vue';

describe('Header', () => {
  it('renders properly', () => {
    const wrapper = mount(HeaderComponent, {
      props: {
        title: 'Simple Link Shortener',
        subtitle: 'A simple link shortener built with Vue 3 and Vite',
      }
    });
    expect(wrapper.text()).toContain({
      title: 'Simple Link Shortener',
      subtitle: 'A simple link shortener built with Vue 3 and Vite',
    });
  });
});