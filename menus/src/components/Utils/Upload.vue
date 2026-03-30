<template>
  <div class="upload-shell">
    <input
      class="upload-input"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      @change="onFileChange"
    />
  </div>
</template>

<script>
export default {
  emits: ["selected"],

  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      if (!file) return

      // ส่ง file object กลับไปให้ parent
      this.$emit("selected", file)
    }
  }
}
</script>

<style scoped>
.upload-shell {
  display: block;
}

.upload-input {
  padding: 0.8rem;
  border: 1px dashed rgba(93, 63, 36, 0.28);
  border-radius: 18px;
  background: rgba(255, 251, 247, 0.9);
  cursor: pointer;
}
</style>
