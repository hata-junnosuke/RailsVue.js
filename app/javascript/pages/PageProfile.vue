<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
                max-width="800"
                class="mx-auto"
                v-if="user"
        >
          <v-card-title>

            <v-avatar size="120">
              <v-img
                      :src="user.avatar_url"
                      aspect-ratio="1"
                      class="grey lighten-2"
              >
                <template v-if="isMe">
                  <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                  >
                    <!-- toggleShow()はvue-image-crop-uploadのメソッド? -->
                    <v-btn icon @click="$refs.avatarUploadDialog.toggleShow()" style="width: 100%; height: 100%;">
                      <v-icon color="secondary">mdi-camera</v-icon>
                    </v-btn>
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
            <!-- 画像の変更モーダル -->
            <avatar-upload ref="avatarUploadDialog"></avatar-upload>

            <v-spacer></v-spacer>
            <v-btn v-if="isMe" class="ma-2" tile outlined color="success" @click="$refs.dialog.open()">
              <v-icon left>mdi-pencil</v-icon> プロフィール編集
            </v-btn>
          </v-card-title>

          <v-list>
            <!-- user.name -->
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-account</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{user.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>
            <!-- user.email -->
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-email</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{user.email}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>
            <!-- introduction -->
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-account-details</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
            <span style="white-space: pre-line">
              {{user.introduction}}
            </span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-music-accidental-sharp</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                          class="ma-1"
                          color="orange"
                          text-color="white"
                          small
                          v-for="tag in user.tags" :key="tag.name"
                  >
                    <v-icon left class="mr-0">mdi-music-accidental-sharp</v-icon>
                    {{tag.name}}
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- refの定義 -->
          <profile-edit-modal v-if="isMe" ref="dialog"></profile-edit-modal>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import ProfileEditModal from "../components/ProfileEditModal";
  import AvatarUpload from "../components/AvatarUpload";
  export default {
      data() {
          return {
              targetUser: null,
          }
      },
      components: {
          ProfileEditModal,
          AvatarUpload
      },
      computed: {
          isMe() {
              // 現在のgettersのurrentUserが存在して、URLのidとcurrentUserのidが一致するかを判定している
              return this.$store.getters['auth/currentUser'] && this.userId == this.$store.getters['auth/currentUser'].id
          },
          // URLのidを格納
          userId() {
              return this.$route.params.id || this.$store.getters['auth/currentUser'].id
          },
          user() {
              // isMeがtrueならcurrentUserを、falseならtargetUserを指し示す。
              return this.isMe ? this.$store.getters['auth/currentUser'] : this.targetUser
          }
      },
      async created() {
          if (this.isMe) return  //isMeがtrueならそのまま返す。
          const res = await axios.get(`/api/users/${this.userId}`) //falseならばuserIdをもとにデータを取ってくる
          this.targetUser = res.data.user
      },
  }
</script>
