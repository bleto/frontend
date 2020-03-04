/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getParsedTreeData } from '@Trees/models/treeMapper';
import { types } from './mutations';

export default {
    getTreeById(
        { commit, dispatch, rootState },
        { treeId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { [userLanguageCode]: categories } = rootState.list.elements;

        return this.app.$axios.$get(`${userLanguageCode}/trees/${treeId}`).then(({
            code,
            name = '',
            categories: treeData,
        }) => {
            const treeToSet = getParsedTreeData(treeData, categories);
            const translations = {
                name,
            };

            treeToSet.forEach(e => dispatch('list/setDisabledElement', { languageCode: userLanguageCode, elementId: e.id, disabled: true }, { root: true }));
            commit(types.SET_TREE_ID, treeId);
            commit(types.SET_CODE, code);
            dispatch('gridDesigner/setGridData', treeToSet, { root: true });
            dispatch('gridDesigner/setFullGridData', treeToSet, { root: true });
            dispatch('translations/setTabTranslations', translations, { root: true });
        });
    },
    async updateTree(
        { rootState },
        {
            id, data, onSuccess,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/trees/${id}`, data).then(() => {
            onSuccess();
        });
        await this.$removeLoader('footerButton');
    },
    setTreeCode({ commit }, code) {
        commit(types.SET_CODE, code);
    },
    removeCategoryTree({ state, rootState }, { onSuccess }) {
        const { treeId } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/trees/${treeId}`).then(() => onSuccess());
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STATE),
};