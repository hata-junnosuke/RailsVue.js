<template>
  <div>
      <v-textarea
              outlined
              color="indigo"
              name="input-7-4"
              label="投稿"
              v-model="micropostContent"
              prepend-icon="mdi-comment"
      ></v-textarea>
      <div class="text-center">
          <!-- 内容が有効なら投稿が押せる。無効なら押せない。クリックするとcreateMicropostが発動  -->
          <v-btn :dark="isValid" color="indigo" :disabled="!isValid" @click="createMicropost">投稿</v-btn>
      </div>
  </div>
</template>

<script>
  export default  {
      data() {
          return {
              micropostContent: ""
          }
      },
      computed: {
          //有効かを常に監視
          isValid() {
              return this.micropostContent.length > 0 && this.micropostContent.length <= 140
          }
      },
      methods: {
          createMicropost() {
              //emitの確認
              //＄emitでは（ケバブケースで渡すメソッド名, 渡す値)を引数とする。
              this.$emit('created', this.micropostContent)
              this.micropostContent = ""
          }
      }
  }
</script>
