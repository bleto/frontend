/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-item"
        :title="itemName">
        <Icon
            v-if="hasChildren"
            class="grid-item__icon"
            :icon="btnExpanderIcon"
            @click.native="toggleItemExpand" />
        <span
            class="grid-item__title txt-fixed typo-subtitle txt--dark-graphite"
            :style="getLabelStyle"
            :title="itemName">
            {{ itemName }}
        </span>
        <span
            v-if="hasChildren"
            class="grid-item__categoies-length txt-fixed typo-hint txt--dark-graphite"
            :title="getNumberOfCategoriesLabel">
            {{ getNumberOfCategoriesLabel }}
        </span>
    </div>
</template>
<script>
import Icon from '~/components/Icon/Icon';

export default {
    name: 'CategoryTreeItem',
    components: {
        Icon,
    },
    props: {
        itemName: {
            type: String,
            required: true,
        },
        numberOfChildren: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    data: () => ({
        isExpanded: true,
    }),
    computed: {
        hasChildren() {
            return this.numberOfChildren > 0;
        },
        btnExpanderIcon() {
            return this.isExpanded
                ? 'arrow-double trans-none'
                : 'arrow-double trans-half';
        },
        getLabelStyle() {
            return !this.hasChildren ? { marginLeft: '12px' } : null;
        },
        getNumberOfCategoriesLabel() {
            return `${this.numberOfChildren} ${this.numberOfChildren === 1 ? 'category' : 'categories'}`;
        },
    },
    methods: {
        toggleItemExpand() {
            this.isExpanded = !this.isExpanded;
            this.$emit('expandItem', this.isExpanded);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-item {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
        width: 0;
        height: 100%;
        border: 1px solid $grey;
        background-color: $background;
        overflow: hidden;

        &__icon {
            flex: 0 0 auto;
            margin-left: 8px;
        }

        &__title {
            flex: 0 0 auto;
            margin: 0 8px;
        }

        &__categoies-length {
            flex: 0 1 auto;
            border: 1px solid $grey;
            padding: 2px 8px;
            border-radius: 12px;
        }

        &__outside-tree {
            position: absolute;
            bottom: 10px;
            right: 10px;
            cursor: help;

            &::after {
                content: "→";
            }
        }
    }
</style>
