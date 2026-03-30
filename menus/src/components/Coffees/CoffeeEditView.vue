<template>
  <section class="page-shell">
    <article class="form-card">
      <h1>Edit Coffee</h1>

      <form v-if="loaded" class="form-layout" @submit.prevent="updateCoffee">
        <div class="field-grid">
          <div class="field-stack">
            <label for="coffee-name">Name</label>
            <input id="coffee-name" v-model="coffee.name" required />
          </div>

          <div class="field-stack">
            <label for="coffee-price">Price</label>
            <input id="coffee-price" v-model.number="coffee.price" type="number" min="0" required />
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
          <label>Replace image</label>
          <Upload @selected="onFile" />
          <p class="form-note">Accepted formats: JPG, PNG, WEBP up to 2MB.</p>
        </div>

        <div v-if="coffee.image || previewImage" class="page-card preview-card">
          <span class="section-kicker">{{ previewImage ? 'New preview' : 'Current image' }}</span>
          <img
            v-if="previewImage"
            :src="previewImage"
            alt="New coffee preview"
          />
          <img
            v-else
            :src="`${BASE_URL}${coffee.image}?t=${Date.now()}`"
            alt="Current coffee image"
          />

          <button
            v-if="previewImage"
            type="button"
            class="button-secondary"
            @click="cancelPreview"
          >
            Remove new preview
          </button>
        </div>

        <div class="field-stack">
          <label>Product story</label>
          <ckeditor :editor="editor" v-model="coffee.content" :config="editorConfig" />
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Updating...' : 'Update' }}
          </button>
          <button type="button" class="button-secondary" :disabled="isLoading" @click="navigateTo('/coffees')">
            Cancel
          </button>
        </div>
      </form>

      <div v-else class="empty-state">
        <h3>Loading coffee...</h3>
        <p>Please wait while the editor loads.</p>
      </div>
    </article>
  </section>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import CoffeeService from '../../services/CoffeeService'
import Upload from '../Utils/Upload.vue'

export default {
  components: { Upload },
  data() {
    return {
      coffee: {},
      file: null,
      previewImage: null,
      loaded: false,
      isLoading: false,
      editor: ClassicEditor,
      editorConfig: {
        ckfinder: {
          uploadUrl: 'http://localhost:8081/coffee-upload-image',
        },
      },
      BASE_URL: 'http://localhost:8081/assets/uploads/',
    }
  },
  async created() {
    try {
      const res = await CoffeeService.show(this.$route.params.coffeeId)
      this.coffee = res.data.data || res.data
      this.loaded = true
    } catch (err) {
      alert('Coffee not found')
      this.$router.push({ name: 'coffees' })
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
    onFile(file) {
      if (!file) return

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
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
    cancelPreview() {
      if (this.previewImage) {
        URL.revokeObjectURL(this.previewImage)
      }

      this.previewImage = null
      this.file = null
    },
    async updateCoffee() {
      try {
        this.isLoading = true

        let imageName = this.coffee.image

        if (this.file) {
          const uploadData = new FormData()
          uploadData.append('image', this.file)

          const uploadRes = await fetch('http://localhost:8081/upload-image', {
            method: 'POST',
            body: uploadData,
          })

          if (!uploadRes.ok) {
            throw new Error('Upload failed')
          }

          const uploadJson = await uploadRes.json()
          imageName = uploadJson.filename
        }

        const data = {
          name: this.coffee.name,
          price: this.coffee.price,
          type: this.coffee.type,
          status: this.coffee.status,
          content: this.coffee.content || '',
          image: imageName,
        }

        await CoffeeService.put(this.coffee.id, data)

        alert('Coffee updated successfully')
        this.$router.push({ name: 'coffees' })
      } catch (err) {
        console.error(err)
        alert('Failed to update coffee')
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
