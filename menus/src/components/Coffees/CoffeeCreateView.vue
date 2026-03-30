<template>
  <section class="page-shell">
    <article class="form-card">
      <h1>Create Coffee</h1>

      <form class="form-layout" @submit.prevent="createCoffee">
        <div class="field-grid">
          <div class="field-stack">
            <label for="coffee-name">Name</label>
            <input id="coffee-name" v-model="coffee.name" type="text" required placeholder="Velvet Latte" />
          </div>

          <div class="field-stack">
            <label for="coffee-price">Price</label>
            <input id="coffee-price" v-model.number="coffee.price" type="number" min="0" required placeholder="120" />
          </div>

          <div class="field-stack">
            <label for="coffee-type">Type</label>
            <select id="coffee-type" v-model="coffee.type">
              <option value="ร้อน">Hot</option>
              <option value="เย็น">Iced</option>
              <option value="ปั่น">Blended</option>
            </select>
          </div>

          <div class="field-stack">
            <label for="coffee-status">Status</label>
            <select id="coffee-status" v-model="coffee.status">
              <option value="มีจำหน่าย">Available</option>
              <option value="หมด">Sold out</option>
            </select>
          </div>
        </div>

        <div class="field-stack">
          <label>Upload image</label>
          <UploadImage @selected="onFileSelected" />
          <p class="form-note">Accepted formats: JPG, PNG, WEBP up to 2MB.</p>
        </div>

        <div v-if="previewImage" class="page-card preview-card">
          <span class="section-kicker">Preview</span>
          <img :src="previewImage" alt="Coffee preview" />
        </div>

        <div class="field-stack">
          <label>Product story</label>
          <ckeditor :editor="editor" v-model="coffee.content" :config="editorConfig" />
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Saving...' : 'Create' }}
          </button>
          <button type="button" class="button-secondary" :disabled="isLoading" @click="navigateTo('/coffees')">
            Cancel
          </button>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import CoffeeService from '../../services/CoffeeService'
import UploadImage from '../Utils/Upload.vue'

export default {
  components: { UploadImage },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        ckfinder: {
          uploadUrl: 'http://localhost:8081/coffee-upload-image',
        },
      },
      coffee: {
        name: '',
        price: 0,
        type: 'ร้อน',
        status: 'มีจำหน่าย',
        image: '',
        content: '',
      },
      file: null,
      previewImage: null,
      isLoading: false,
    }
  },
  beforeUnmount() {
    if (this.previewImage) {
      URL.revokeObjectURL(this.previewImage)
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    onFileSelected(file) {
      if (!file) return

      const allowed = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowed.includes(file.type)) {
        alert('Please use JPG, PNG, or WEBP.')
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Image must be 2MB or smaller.')
        return
      }

      this.file = file

      if (this.previewImage) {
        URL.revokeObjectURL(this.previewImage)
      }

      this.previewImage = URL.createObjectURL(file)
    },
    async createCoffee() {
      try {
        if (!this.file) {
          alert('Please select an image first.')
          return
        }

        this.isLoading = true

        const formData = new FormData()
        formData.append('image', this.file)

        const res = await fetch('http://localhost:8081/upload-image', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          throw new Error('Upload failed')
        }

        const uploadJson = await res.json()
        this.coffee.image = uploadJson.filename

        await CoffeeService.post(this.coffee)

        alert('Coffee created successfully')
        this.$router.push({ name: 'coffees' })
      } catch (err) {
        console.error(err)
        alert('Failed to save coffee')
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
.preview-card {
  display: grid;
  gap: 1rem;
}

.preview-card img {
  width: min(100%, 360px);
  border-radius: 18px;
  box-shadow: 0 18px 34px rgba(70, 44, 25, 0.12);
}
</style>
