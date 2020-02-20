import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Toastify from 'toastify-js'
// import url from '@/axios/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    products: []
  },
  mutations: {
    FETCH_PRODUCTS (state, products) {
      state.products = products
    },
    ISLOGIN (state, status) {
      state.isLogin = status
      console.log(state.isLogin)
    }
  },
  actions: {
    loginAdmin (context, payload) {
      axios.post('http://localhost:3000/admin/login', payload)
        .then(({ data }) => {
          localStorage.token = data.token
          context.commit('ISLOGIN', true)
          router.push('/admin')
        })
        .catch(({ response }) => {
          console.log(response.data.err)
          Toastify({
            text: response.data.err,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
        })
    },
    registerAdmin (context, payload) {
      axios.post('http://localhost:3000/admin/register', payload)
        .then(({ data }) => {
          localStorage.token = data.token
          context.commit('ISLOGIN', true)
          router.push('/admin')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      return axios.post('http://localhost:3000/products/list', payload,
        {
          headers: {
            token: localStorage.token
          }
        })
    },
    fetchProducts (context) {
      axios.get('http://localhost:3000/products/list')
        .then(({ data }) => {
        //   console.log(data)
          context.commit('FETCH_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct (context, payload) {
      return axios.put(`http://localhost:3000/products/${payload.id}/item`, payload,
        {
          headers: {
            token: localStorage.token
          }
        })
    },
    deleteProduct (context, payload) {
      return axios.delete(`http://localhost:3000/products/${payload}/item`, {
        headers: {
          token: localStorage.token
        }
      })
    }
  }
})

export default store
