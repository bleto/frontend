<template>
    <img
        class="image"
        :src="image">
</template>

<script>
import { mapActions } from 'vuex';
import { getImageData } from '~/model/multimedia';

export default {
    name: 'Picture',
    props: {
        imageId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            image: null,
        };
    },
    watch: {
        imageId() {
            this.getImageById();
        },
    },
    created() {
        this.getImageById();
    },
    methods: {
        ...mapActions('validations', [
            'onError',
        ]),
        async getImageById() {
            await this.$axios.$get(`multimedia/${this.imageId}`, {
                responseType: 'arraybuffer',
            }).then(response => this.onSuccess(response)).catch(e => this.onError(e.data));
        },
        onSuccess(response) {
            this.image = getImageData(response);
        },
    },
};
</script>

<style lang="scss" scoped>
    .image {
        width: 100%;
        max-height: 100%;
        object-fit: cover;
    }
</style>
