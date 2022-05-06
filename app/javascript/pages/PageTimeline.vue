<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="pb-10">
                    <div class="mb-5" v-if="$store.getters['auth/currentUser']">
                    <!-- 投稿フォーム -->
                    <!-- $emitからのメソッドは@で受け取り、親の中のメソッド名を設定する -->
                        <micropost-form @created="createMicropost"></micropost-form>
                    </div>
                    <!--投稿リスト  -->
                    <timeline-list v-if="isExistMicroposts" :microposts="microposts" class="mb-5"></timeline-list>
                    <div class="text-center" v-else>
                        一件もありません
                    </div>
                    <!-- ページネーション -->
                    <template v-if="pagingMeta">
                        <div class="text-center">
                            <v-pagination
                                    color="indigo"
                                    v-model="pagingMeta.current_page"
                                    :length="pagingMeta.total_pages"
                                    @input="paging"
                            ></v-pagination>
                        </div>
                    </template>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import MicropostForm from '@/components/MicropostForm'
    import TimelineList from '@/components/TimelineList'
    import axios from "axios";
    export default {
        data() {
            return {
                microposts: [],
                pagingMeta: null,
                currentPage: 1
            }
        },
        components: {
            MicropostForm,
            TimelineList
        },
        computed: {
            //投稿の存在確認
            isExistMicroposts() {
                return this.microposts.length > 0
            }
        },
        // 立ち上げの時にfetchMicropostsを呼び出し
        created() {
            this.fetchMicroposts()
        },
        methods: {
            //getでデータを取得
            async fetchMicroposts() {
                // ページごとに区切りをつける
                const res = await axios.get(`/api/microposts`, { params: { page: this.currentPage } })
                this.microposts = res.data.microposts
                this.pagingMeta = res.data.meta
            },
            //引数で$emitからの値を受け取ることが可能
            async createMicropost(micropostContent) {
                // micropostParamsを作成
                const micropostParams = {
                    micropost: {
                        content: micropostContent
                    }
                }
                //axiosでデータを送信
                const res = await axios.post(`/api/microposts`, micropostParams)
                // スプレット構文
                this.microposts =[...[res.data.micropost], ...this.microposts]
            },
            // 表示のページ切り替え
            paging(page) {
                this.currentPage = page
                this.fetchMicroposts()
                this.$vuetify.goTo(0)  //クリックしたときに一番上まで戻ります。
            }
        }
    }
</script>
