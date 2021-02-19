import { createStore } from 'vuex'
import { auth } from '@/store/auth'
import { stream } from '@/store/stream'
import { advert } from '@/store/advert'

export default createStore({
  modules: {
    auth,
    stream,
    advert
  }
})
