/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from "@vue/test-utils"
import TemplateGridShadowItem from '~/components/TemplateGrid/TemplateGridShadowItem';

describe('TemplateGrid/TemplateGridShadowItem', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(TemplateGridShadowItem, {
        propsData: {
          lastRow: false,
          itemId: 1,
        },
      });
    });
    it("Component rendered correctly", () => {
      expect(wrapper.is(TemplateGridShadowItem)).toBe(true);
    });

    it('Check if component is named correctly', () => {
      expect(typeof TemplateGridShadowItem.name).toBe('string');
      expect(TemplateGridShadowItem.name).toEqual('TemplateGridShadowItem');
    });
    it('Check if not last row', () => {
      expect(wrapper.contains('.shadow-grid-item--last-row')).toBeFalsy();
    });
    it('Check if last row', () => {
      wrapper.setProps({
        lastRow: true,
      });
      expect(wrapper.contains('.shadow-grid-item--last-row')).toBeTruthy();
    });
    it('Check item default id', () => {
      expect(wrapper.vm.lastRow).toBeFalsy();
      expect(wrapper.vm.itemId).toBe(1);
      expect(wrapper.contains('[shadow-id="1"]')).toBe(true)
    });
    it('Check item id', () => {
      wrapper.setProps({
        itemId: 3,
      });
      expect(wrapper.vm.lastRow).toBeFalsy();
      expect(wrapper.vm.itemId).toBe(3);
      expect(wrapper.contains('[shadow-id="3"]')).toBe(true)
    });
});
