/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-bar">
        <div class="tab-bar__items">
            <div
                :class="
                    [
                        'tab-bar__items__scrollable-container',
                        {
                            'scrolling-disabled': !isScrollingEnabled
                        }
                    ]">
                <VerticalTabBarItem
                    v-for="(item, index) in items"
                    :key="index"
                    :index="index"
                    :item="item"
                    :is-content-expanded="isExpanded"
                    :is-selected="index === selectedTabIndex"
                    @select="onSelectTabBarItem" />
            </div>
            <div class="tab-bar__items__expand-btn">
                <Button
                    :icon="btnExpanderImage"
                    fab
                    color="transparent"
                    ripple-color="rgba(235, 235, 236, 1)"
                    @click.native="expandTabContent" />
            </div>
        </div>
        <div
            v-show="isExpanded"
            class="tab-bar__item-content-container">
            <VerticalTabContent :tab-item="items[selectedTabIndex]" />
        </div>
    </div>
</template>

<script>
import tabBarMixin from '~/mixins/tabBar/tabBarMixin';

export default {
    name: 'VerticalTabBar',
    components: {
        VerticalTabContent: () => import('~/components/Tab/VerticalTabContent'),
        VerticalTabBarItem: () => import('~/components/Tab/VerticalTabBarItem'),
        Button: () => import('~/components/Buttons/Button'),
    },
    mixins: [tabBarMixin],
    data: () => ({
        selectedTabIndex: 0,
        isExpanded: true,
        contentWidth: 200,
    }),
    computed: {
        btnExpanderImage() {
            return this.isExpanded
                ? 'arrow-double trans-quarter'
                : 'arrow-double trans-three-fourth';
        },
    },
    methods: {
        onSelectTabBarItem(index) {
            this.selectedTabIndex = index;
        },
        expandTabContent() {
            this.isExpanded = !this.isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar {
        display: flex;

        &__items {
            position: relative;
            right: -1px;
            z-index: 2;
            display: flex;
            flex-flow: column nowrap;
            width: 82px;

            &__scrollable-container {
                position: relative;
                display: flex;
                overflow-x: auto;
                flex-flow: column nowrap;
            }

            &__expand-btn {
                display: flex;
                justify-content: flex-end;
                padding: 4px;
            }
        }

        &__item-content-container {
            display: flex;
            flex-direction: column;
            border: 1px solid $grey;
            box-sizing: border-box;
            background-color: $white;
            border-bottom: none;
        }
    }
</style>
