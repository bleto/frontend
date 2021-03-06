/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Icon from '~/components/Icon/Icon';

const localVue = createLocalVue();
localVue.directive('ripple', {});

describe('Icon/Icon', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Icon, {
            localVue,
            propsData: {
                icon: 'menu',
            },
        });
    });
    it("Component rendered correctly", () => {
        expect(wrapper.is(Icon)).toBe(true);
    });
    it('Check if component is named correctly', () => {
        expect(typeof Icon.name).toBe('string');
        expect(Icon.name).toEqual('Icon');
    });
    it('Check if the props are default', () => {
        expect(wrapper.vm.icon).toEqual('menu');
        expect(wrapper.vm.size).toEqual('small');
        expect(wrapper.vm.transform).toBeFalsy();
        expect(wrapper.classes()).toContain("icon--small", "menu");
    });
    it("Check correct class", () => {
        wrapper.setProps({
            icon: 'side-bar',
            size: 'large',
            transform: 'rotate',
        });
        expect(wrapper.classes()).toContain("icon--large", "side-bar", "rotate");
    });
});
