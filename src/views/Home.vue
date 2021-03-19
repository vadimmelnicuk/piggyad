<template>
  <transition name="slide-fade">
    <div v-if="inquirySubmitted" class="confirm-inqury box mb-2 border-green text-green">
      <div>
        Thank you for registering your interest in Piggyad!
      </div>
      <div>
        You will be the first one to hear about our launch.
      </div>
    </div>
  </transition>
  <div class="landing-banner">
    <div class="line-1 mb-1">Earn cash while streaming on <i class="fab fa-twitch"></i> Twitch or <i class="fab fa-youtube"></i> Youtube</div>
    <div class="line-2">You can earn up to <u>${{streamerPayout}}</u> per month by hosting ads</div>
    <div class="line-2">with an average audience of <input type="number" v-model="streamerAudience"> and <input type="number" v-model="streamerTime"> hours of streaming time per week.</div>
  </div>
  <div class="landing-streamer-details flex">
    <ul class="flex1 font-15 mr-2">
      <li>
        <span class="text-grey inline w-2-5"><i class="fas fa-gamepad"></i></span>
        We support streamers of any size
      </li>
      <li>
        <span class="text-grey inline w-2-5"><i class="fas fa-fingerprint"></i></span> All ad content is carefully moderated
      </li>
      <li>
        <span class="text-grey inline w-2-5"><i class="fas fa-cash-register"></i></span>
        Transparent payouts
      </li>
      <li>
        <span class="text-grey inline w-2-5"><i class="fas fa-coins"></i></span>
        No limits on withdrawals
      </li>
      <li>
        <span class="text-grey inline w-2-5"><i class="fas fa-fighter-jet"></i></span>
        One-off setup
      </li>
    </ul>
    <div class="sign-up flex1 font-15">
      <input type="email" placeholder="Your email" v-model="emailStreamer">
      <button class="button large purple w-100p mt-1" v-on:click="submitInquiry('streamer')">Sign up</button>
    </div>
  </div>
  <div class="landing-advertisers box">
    <div class="title mb-2">Advertise on streaming platforms at very competitive rate</div>
    <div class="landing-advertisers-details flex">
      <ul class="flex1 font-15 mr-2">
        <li>
          <span class="text-grey inline w-2-5"><i class="fas fa-hand-holding-usd"></i></span>
          CPM is only <u>$0.35</u>
        </li>
        <li>
          <span class="text-grey inline w-2-5"><i class="fas fa-chart-pie"></i></span>
          We work with business of any size and budget
        </li>
        <li>
          <span class="text-grey inline w-2-5"><i class="fas fa-unlock-alt"></i></span>
          AdBlocking technologies are ineffective against our approach
        </li>
      </ul>
      <div class="contact flex1">
        <!-- <div class="font-15">Contact us at</div>
        <a href="mailto:sales@piggyad.com">sales@piggyad.com</a> -->
        <input type="email" placeholder="Your email" v-model="emailAdvertiser">
        <button class="button large w-100p mt-1" v-on:click="submitInquiry('advertiser')">Get started</button>
      </div>
    </div>
    
    
  </div>
  <div>

  </div>
</template>

<script>
import {API} from 'aws-amplify'
import {createInquiry} from '@/graphql/mutations'

export default {
  name: 'Home',
  data() {
    return {
      streamerAudience: 500,
      streamerTime: 25,
      emailStreamer: '',
      emailAdvertiser: '',
      inquirySubmitted: false
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    payout() {
      return this.$store.getters['stream/payout']
    },
    streamerPayout() {
      return this.payout * this.streamerAudience / 10 * this.streamerTime * 4
    }
  },
  methods: {
    async submitInquiry(type) {
      const email = type === 'streamer' ? this.emailStreamer : this.emailAdvertiser

      if (email === '') {
        this.$store.commit('toast/add', {text: 'Please type in your email', type: 'error'})
        return
      }

      const emailRule = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const emailValid = emailRule.test(email)

      if (emailValid) {
        try {
          const response = await API.graphql({query: createInquiry, authMode: 'API_KEY', variables: {input: {
            type: type,
            email: email
          }}})
          
          this.emailStreamer = ''
          this.emailAdvertiser = ''
          this.inquirySubmitted = true

          let self = this

          setTimeout(function() {
            self.inquirySubmitted = false
          }, 10000)
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$store.commit('toast/add', {text: 'Please provide a valid email address', type: 'error'})
      }
    }
  }
}
</script>

<style scoped>
.confirm-inqury {padding: 2rem; font-size: 1.8rem; text-align: center;}

.landing-banner {border-radius: 0.5rem; padding: 2rem; padding-bottom: 2.5rem; background: linear-gradient(#2563EB, #3F19AC);}
.landing-banner .line-1 {font-size: 2.8rem;}
.landing-banner .line-2 {font-size: 1.8rem;}

.landing-streamer-details {padding: 2rem;}
.landing-streamer-details .sign-up {text-align: center;}
.landing-streamer-details ul {list-style-type: none;}

.landing-advertisers {padding: 2rem; margin-top: 3rem; font-size: 1.8rem;}
.landing-advertisers .title {font-size: 2.8rem; font-weight: 400;}

.landing-advertisers-details ul {list-style-type: none;}
.landing-advertisers-details .get-started {text-align: center;}
.landing-advertisers-details input[type="email"] {background-color: #0E1114;}

input[type="number"] {width: 5rem; padding: 0.25rem; background: #FFFFFF10; border-radius: 0.5rem; font-size: 1.8rem; color: #E5E7EB; text-align: center; -moz-appearance: textfield;}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}

input[type="email"] {display: inline-block; width: 100%; height: 3rem; padding: 0 1rem; font-size: 1.5rem; color: #E5E7EB; text-align: center; border: 1px solid #E5E7EB20; border-radius: 0.5rem; background-color: #0b0d0f;}
input[type="email"]::placeholder {color: #6B7280;}

@media (max-width: 1024px) {
  .landing-streamer-details {display: block; padding: 0; margin-top: 2rem;}
  .landing-streamer-details .sign-up {margin-top: 2rem;}

  .landing-advertisers-details {display: block;}
  .landing-advertisers-details .contact {margin-top: 2rem;}
}

@media (max-width: 768px) {
  .confirm-inqury {font-size: 1.6rem;}
  
  .landing-banner .line-1 {font-size: 1.6rem;}
  .landing-banner .line-2 {font-size: 1.25rem;}

  .landing-advertisers .title {font-size: 1.6rem;}
  .landing-advertisers-details ul {font-size: 1rem;}

  input[type="number"] {width: 3.5rem; font-size: 1.25rem;}
  input[type="email"] {font-size: 1.25rem;}

  .landing-streamer-details ul {font-size: 1rem;}
}
</style>
