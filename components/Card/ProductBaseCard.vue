/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <TextField
            :value="sku"
            hint="Products SKU must be unique"
            solid
            regular
            label="Sku"
            required
            :error-messages="errorSkuMessage"
            :disabled="isDisabled"
            @input="(sku) => setProductSku({ sku })" />
        <Select
            :value="template"
            solid
            required
            regular
            label="Template"
            :error-messages="errorTemplateMessage"
            :options="templateValues"
            :disabled="isDisabled"
            @input="(template) => setProductTemplate({ template })" />
        <Select
            :value="selectedCategories"
            solid
            regular
            multiselect
            :dismissible="false"
            label="Category"
            clearable
            @input="clearContent">
            <TranslationMultiselectListContent
                slot="selectContent"
                :options="categoryOptions"
                :selected-options="selectedCategories"
                @values="onCategoriesChange" />
        </Select>
        <slot />
    </BaseCard>
</template>

<script>
import BaseCard from '~/components/Card/BaseCard';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ProductBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
        Select: () => import('~/components/Inputs/Select/Select'),
        TranslationMultiselectListContent: () => import('~/components/Inputs/Select/Contents/TranslationMultiselectListContent'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('productsDraft', {
            productID: state => state.id,
            sku: state => state.sku,
            template: state => state.template,
            templates: state => state.templates,
            selectedCategories: state => state.selectedCategories,
            categories: state => state.categories,
        }),
        templateValues() {
            return this.templates.map(template => template.name);
        },
        categoryOptions() {
            return this.categories.map(category => ({ key: category.code, value: category.name }));
        },
        isDisabled() {
            return Boolean(this.productID);
        },
        errorSkuMessage() {
            const skuIndex = 'sku';
            return this.elementIsValidate(skuIndex);
        },
        errorTemplateMessage() {
            const templateIndex = 'templateId';
            return this.elementIsValidate(templateIndex);
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'setProductSku',
            'setProductTemplate',
            'setProductCategories',
        ]),
        onCategoriesChange(categories) {
            this.setProductCategories({
                selectedCategories: categories,
            });
        },
        clearContent() {
            this.setProductCategories({
                selectedCategories: [],
            });
        },
    },
};
</script>
