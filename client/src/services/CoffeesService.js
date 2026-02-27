import Api from './Api'

export default {
  show(coffeeId) {
    return Api().get(`coffee/${coffeeId}`)
  },
  index() {
    return Api().get('coffees')
  },
  create(data) {
    return Api().post('coffee', data)
  },
  update(id, data) {
    return Api().put(`coffee/${id}`, data)
  },
  delete(id) {
    return Api().delete(`coffee/${id}`)
  }
}
