<template>
    <v-container>
        <v-row>
            <v-col>
                <div>
                    <div class="mb-5" v-if="$store.getters['auth/currentUser']">
                    <!-- 投稿フォーム -->
                    <!-- $emitからのメソッドは@で受け取り、親の中のメソッド名を設定する -->
                        <micropost-form @created="createMicropost"></micropost-form>
                    </div>
                    <!--投稿リスト  -->
                    <timeline-list v-if="isExistMicroposts" :microposts="microposts"></timeline-list>
                    <div class="text-center" v-else>
                        一件もありません
                    </div>
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
                const res = await axios.get(`/api/microposts`)
                this.microposts = res.data.microposts
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
            }
        }
    }
</script>
