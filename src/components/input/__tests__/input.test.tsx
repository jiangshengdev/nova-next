import { mount } from '@vue/test-utils';
import { NovaInput } from '../NovaInput';
import { describe, test, expect } from 'vitest'

describe('input', () => {
  test('render', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return (
            <div>
              <NovaInput />
              <NovaInput disabled />
              <NovaInput readonly />
            </div>
          );
        };
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
