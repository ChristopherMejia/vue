<template>
    <button
     @click="buttonClick"
     class="text-white hover:text-red-500 ...">
        <slot></slot>
    </button>
</template>

<script>

export default {
    name: 'PxButton',

    methods:{
        buttonClick(){
            this.$emit('custom-click')
        }
    },
}
</script>
