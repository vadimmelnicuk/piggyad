import {createStore} from 'vuex'
import {auth} from '@/store/auth'
import {stream} from '@/store/stream'
import {advert} from '@/store/advert'
import {toast} from '@/store/toast'

export default createStore({
  modules: {
    auth,
    stream,
    advert,
    toast
  }
})
