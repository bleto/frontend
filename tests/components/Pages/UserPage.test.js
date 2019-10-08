/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import UserPage from '~/components/Pages/UserPage';

const mocks = {
    $hasAccess: jest.fn(),
    $route: {
        params: {
            id: '12345',
        },
    },
};

describe('Pages/UserPage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(UserPage, {
            mocks,
            propsData: {
                title: '',
            },
            stubs: {
                NuxtLink: true,
                Button: true,
                HorizontalTabBar: true,
            },
        });
    });
    it('Component rendered correctly', () => {
        expect(wrapper.is(UserPage)).toBe(true);
    });

    it('Check if component is named correctly', () => {
        expect(typeof UserPage.name).toBe('string');
        expect(UserPage.name).toEqual('UserPage');
    });

    it('Check tab paths for new page', () => {
        expect(wrapper.vm.isEdit).toBeFalsy();
        expect(wrapper.vm.tabs[0].path).toBe('/users/user/new/general');
        expect(wrapper.vm.tabs[1].path).toBe('/users/user/new/avatar');
    });

    it('Check tab paths for edit page', () => {
        wrapper = mount(UserPage, {
            mocks,
            propsData: {
                title: '',
                isEdit: true,
            },
            stubs: {
                Button: true,
                HorizontalTabBar: true,
            },
        });
        expect(wrapper.vm.isEdit).toBeTruthy();
        expect(wrapper.vm.tabs[0].path).toBe('/users/user/edit/12345/general');
        expect(wrapper.vm.tabs[1].path).toBe('/users/user/edit/12345/avatar');
    });
});
