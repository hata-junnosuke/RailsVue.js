<template>
    <v-card>
        <v-list three-line>
            <!-- v-forでmicropostItemを繰り返し表示をしている。記述形式がケバブ形式の点に注意 -->
            <!-- micropostをmicropost-itemにbindしている -->
            <micropost-item v-for="micropost in microposts" :key="micropost.id" :micropost="micropost"></micropost-item>
        </v-list>
    </v-card>
</template>

<script>
    import MicropostItem from '@/components/MicropostItem'
    export default {
        props: {
            //micropostsをpropsで受け取る
            microposts: {
                type: Array,
                default: []
            }
        },
        components: {
            MicropostItem
        }
    }
</script>
