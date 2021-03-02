<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch("auth/loginCheck")
  }
}
</script>

<style>
* {box-sizing: border-box; margin: 0; padding: 0;}

body {font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 16px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #E5E7EB;}

.container {width: 100%; padding: 0 2rem; margin: 0 auto;}

@media (min-width: 640px) {
  .container {max-width: 640px}
}
@media (min-width: 768px) {
  .container {max-width: 768px}
}
@media (min-width: 1024px) {
  .container {max-width: 1024px}
}
@media (min-width: 1280px) {
  .container {max-width: 1280px}
}

.title {font-weight: 600; font-size: 1.4rem;}

a {color: #60a5fa; text-decoration: none; cursor: pointer;}
a:hover {text-decoration: underline;}

.font-08 {font-size: 0.8rem;}
.font-12 {font-size: 1.2rem;}

.button {display: inline-block; height: 2.25rem; font-weight: 600; cursor: pointer; color: #E5E7EB; padding: 0 1rem; padding-top: 0.35rem; border-radius: 0.5rem; transition: background-color 0.2s ease 0s; background-color: #DBEAFE10;}
.button.round {width: 1.5rem; height: 1.5rem; padding: 0; border-radius: 1rem; text-align: center; vertical-align: middle;}
.button.round img {padding: 0.25rem;}
.button:hover {color: #FFFFFF; text-decoration: none; background-color: #DBEAFE20;}

input, button {border:none; outline: none; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 1rem;}
button {padding-top: 0 !important;}
input[type=submit] {padding-top: 0 !important; padding-bottom: 0.25rem;}
input[type=text], input[type=password] {display: inline-block; height: 2.25rem; padding: 0 0.5rem; color: #E5E7EB; border: 1px solid #E5E7EB20; border-radius: 0.25rem; background-color: #0E1114;}
input[type=text]:focus, input[type=password]:focus {border: 1px solid #3B82F6;}
input[type=file] {display: none;}
input[type=range] {appearance: none; cursor: pointer; width: 100%; height: 0.5rem; border-radius: 1rem; background-color: #DBEAFE20; outline: none; opacity: 1; transition: 0.2s;}
input[type=range]:hover {background-color: #DBEAFE30;}
input[type=range]::-webkit-slider-thumb {appearance: none; height: 1rem; width: 1rem; border-radius: 50%; background: #E5E7EB;}
input[type=range]::-moz-range-thumb {appearance: none; height: 1rem; width: 1rem; border-radius: 50%; background: #E5E7EB;}

.file-upload {display: inline-block; height: 2.25rem; padding: 0 0.5rem; border: 1px solid #E5E7EB20; border-radius: 0.25rem; background-color: #0E1114; vertical-align: top; padding-top: 0.35rem; cursor: pointer;}

.toggle-switch {position: relative; display: inline-block; width: 2.5rem; height: 1.5rem;}
.toggle-switch input {opacity: 0; width: 0; height: 0;}
.toggle-switch input:checked + .slider {background-color: #10B981;}
/* .toggle-switch input:focus + .slider {box-shadow: 0 0 1px #2196F3;} */
.toggle-switch input:checked + .slider:before {transform: translateX(1rem);}
.toggle-switch .slider {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; border-radius: 1.5rem; background-color: #DBEAFE20; transition: 0.2s;}
.toggle-switch .slider:hover {background-color: #DBEAFE30;}
.toggle-switch .slider:before {position: absolute; content: ""; height: 1rem; width: 1rem; left: 0.25rem; bottom: 0.25rem; border-radius: 50%; background-color: #E5E7EB; transition: 0.2s;}

.box {border: 1px solid #E5E7EB20; background-color: #12161A; border-radius: 0.5rem;}
.box-separator {border-top: 1px solid #E5E7EB20;}

.tag {display: inline-block; vertical-align: middle; height: 1.5rem; padding: 0.1rem 0.5rem 0 0.5rem; border: 1px solid #E5E7EB; border-radius: 0.5rem; font-size: 0.8rem;}

.flex {display: flex;}
.float-right {float: right;}
.hidden {display: none;}

.mt-1 {margin-top: 1rem;}
.mt-2 {margin-top: 2rem;}
.mb-05 {margin-bottom: 0.5rem;}
.mb-1 {margin-bottom: 1rem;}
.mb-2 {margin-bottom: 2rem;}
.ml-05 {margin-left: 0.5rem;}
.ml-1 {margin-left: 1rem;}
.ml-2 {margin-left: 2rem;}
.mr-05 {margin-right: 0.5rem;}
.mr-1 {margin-right: 1rem;}
.mr-2 {margin-right: 2rem;}

.w-100p {width: 100%;}
.w-10 {width: 10rem;}
.w-5 {width: 5rem;}
.h-100p {height: 100%;}

.padding-1 {padding: 1rem;}

.text-white {color: #E5E7EB;}
.text-grey {color: #6B7280;}
.text-red {color: #EF4444;}
.text-green {color: #10B981;}
.text-blue {color: #60a5fa;}

.border-red {border-color: #EF444480;}
.border-green {border-color: #10B98180;}
</style>
