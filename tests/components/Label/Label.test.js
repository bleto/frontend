/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import Label from '~/components/Label/Label.vue';


describe('Label/Label', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Label, {
            propsData: {
                text: '',
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(Label)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof Label.name).toBe('string');
        expect(Label.name).toEqual('Label');
    });

    it('Check alert classes', () => {
        wrapper.setProps({
            text: 'Test',
            isDisabled: true,
        });
        expect(wrapper.vm.getLabelColor).toBe('txt--light-graphite');
        expect(wrapper.contains('.txt--light-graphite')).toBeTruthy();
    });

    describe('Check label text', () => {
      it('Check default text', () => {
          expect(wrapper.find('label').exists()).toBeTruthy();
          expect(wrapper.find('label').text()).toEqual('');
      });

      it('Check the text for the set property', () => {
          wrapper.setProps({
              text: 'test jest',
          });
          expect(wrapper.find('label').exists()).toBeTruthy();
          expect(wrapper.find('label').text()).toEqual('test jest');
      });
  });
});
