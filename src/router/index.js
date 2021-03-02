import { Auth } from 'aws-amplify'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layouts/MainLayout.vue'
import StreamLayout from '@/components/layouts/StreamLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [{
      path: '',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    }]
  },
  {
    path: '/about',
    component: MainLayout,
    children: [{
      path: '',
      name: 'About',
      component: () => import('@/views/About.vue')
    }],
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/:username',
    component: MainLayout,
    children: [{
      path: '',
      name: 'Profile',
      component: () => import('@/views/auth/Profile.vue')
    }],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: MainLayout,
    children: [{
      path: '',
      name: 'Login',
      component: () => import('@/views/auth/Login.vue')
    }]
  },
  {
    path: '/signup',
    component: MainLayout,
    children: [{
      path: '',
      name: 'Signup',
      component: () => import('@/views/auth/Signup.vue')
    }]
  },
  {
    path: '/stream',
    component: MainLayout,
    children: [{
      path: '',
      name: 'Stream',
      component: () => import('@/views/Stream.vue')
    }],
    meta: { requiresAuth: true }
  },
  {
    path: '/stream/:token',
    component: StreamLayout,
    children: [{
      path: '',
      name: 'StreamLink',
      component: () => import('@/views/StreamLink.vue')
    }]
  },
  {
    path: '/advertise',
    component: MainLayout,
    children: [{
      path: '',
      name: 'Advertise',
      component: () => import('@/views/Advertise.vue')
    }],
    meta: { requiresAuth: true }
  },
  {
    path: '/admin-panel',
    component: MainLayout,
    children: [{
      path: '',
      name: 'AdminPanel',
      component: () => import('@/views/AdminPanel.vue')
    }],
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const isAuthenticated = await Auth.currentUserInfo()
  let isAdmin = false

  // Check if user is in Admin group
  if (requiresAdmin && isAuthenticated) {
    const session = await Auth.currentSession()

    if (session.accessToken.payload['cognito:groups']) {
      isAdmin = session.accessToken.payload['cognito:groups'].includes('Admin')
    }
  }

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (requiresAdmin && !isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
