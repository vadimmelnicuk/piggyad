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

.font-06 {font-size: 0.6rem;}
.font-07 {font-size: 0.7rem;}
.font-08 {font-size: 0.8rem;}
.font-1 {font-size: 1rem;}
.font-12 {font-size: 1.2rem;}
.font-15 {font-size: 1.5rem;}

.button {display: inline-block; height: 2.25rem; font-weight: 600; cursor: pointer; color: #E5E7EB; padding: 0 1rem; padding-top: 0.35rem; border-radius: 0.5rem; transition: background-color 0.2s ease 0s; background-color: #DBEAFE10;}
.button.round {width: 1.5rem; height: 1.5rem; padding: 0; border-radius: 1rem; text-align: center; vertical-align: middle;}
.button.round img {padding: 0.25rem;}
.button:hover {color: #FFFFFF; text-decoration: none; background-color: #DBEAFE20;}
.button.blue {background-color: #1D4ED8;}
.button.blue:hover {color: #FFFFFF; text-decoration: none; background-color: #2563EB;}
.button.purple {background-color: #3F19AC;}
.button.purple:hover {background-color: #461cb8; color: #FFFFFF; text-decoration: none;}
.button.large {height: 3rem; padding: 0 1rem; font-size: 1.5rem; font-weight: 400;}

input, button {border:none; outline: none; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 1rem;}
button {padding-top: 0 !important;}

select {display: inline-block; height: 2.25rem; padding: 0 0.5rem; color: #E5E7EB; border: 1px solid #E5E7EB20; border-radius: 0.25rem; background-color: #0E1114; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 1rem; cursor: pointer;}
select:focus {outline: 0; border: 1px solid #3B82F6;}
select:invalid {color: #6B7280;}
select option:hover {padding: 0.25rem 0; background-color: #3B82F6;}

input[type=submit] {padding-top: 0 !important; padding-bottom: 0.25rem;}

input[type=text], input[type=password] {display: inline-block; height: 2.25rem; padding: 0 0.5rem; color: #E5E7EB; border: 1px solid #E5E7EB20; border-radius: 0.25rem; background-color: #0E1114;}
input[type=text]:focus, input[type=password]:focus {border: 1px solid #3B82F6;}
input[type=text]::placeholder, input[type=password]::placeholder {color: #6B7280;}

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

.tags-input-root {display: inline-block; height: 2.25rem; color: #E5E7EB; border: 1px solid #E5E7EB20; border-radius: 0.25rem; background-color: #0E1114;}
.tags-input-root .tags-input {display: flex; flex-direction: row; align-items: stretch;}
.tags-input-root input {flex: 1; height: auto; padding: 0 0.72rem; margin-top: 0.3rem; border: none; border-radius: 0; background-color: none;}
.tags-input-root input:focus {border: none;}
.tags-input-root .tags-input-badge {display: inline-block; vertical-align: middle; height: 1.5rem; padding: 0.15rem 0.5rem 0 0.5rem; margin-left: 0.5rem; margin-top: 0.3rem; background-color: #DBEAFE20; border-radius: 0.5rem; font-size: 0.8rem; vertical-align: top;}
.tags-input-root .tags-input-badge .tags-input-remove {display: inline-block; margin-left: 0.25rem;}
.tags-input-root .typeahead-dropdown {list-style-type:none; background-color: #0E1114; border: 1px solid #DBEAFE20; padding: 0.25rem 0.7rem; margin-top: 0.3rem; margin-left: -1px; cursor: pointer;}

.box {border: 1px solid #E5E7EB20; background-color: #12161A; border-radius: 0.5rem;}
.box-separator {border-top: 1px solid #E5E7EB20;}
.box-separator-right {border-right: 1px solid #E5E7EB20;}

.tag {display: inline-block; vertical-align: middle; height: 1.5rem; padding: 0.1rem 0.5rem 0 0.5rem; border: 1px solid #E5E7EB; border-radius: 0.5rem; font-size: 0.8rem;}

.flex {display: flex; flex-direction: row; align-items: stretch;}
.flex1 {flex: 1;}
.float-right {float: right;}
.hidden {display: none;}
.inline {display: inline-block;}
.va-top {vertical-align: top;}

.margin-1 {margin: 1rem;}
.mt-05 {margin-top: 0.5rem;}
.mt-1 {margin-top: 1rem;}
.mt-15 {margin-top: 1.5rem;}
.mt-2 {margin-top: 2rem;}
.mb-05 {margin-bottom: 0.5rem;}
.mb-1 {margin-bottom: 1rem;}
.mb-2 {margin-bottom: 2rem;}
.ml-05 {margin-left: 0.5rem;}
.ml-1 {margin-left: 1rem;}
.ml-15 {margin-left: 1.5rem;}
.ml-2 {margin-left: 2rem;}
.mr-05 {margin-right: 0.5rem;}
.mr-1 {margin-right: 1rem;}
.mr-2 {margin-right: 2rem;}

.w-100p {width: 100%;}
.w-10 {width: 10rem;}
.w-5 {width: 5rem;}
.w-3 {width: 3rem;}
.w-2-5 {width: 2.5rem;}
.h-100p {height: 100%;}

.padding-1 {padding: 1rem;}
.pr-1 {padding-right: 1rem;}
.pr-2 {padding-right: 2rem;}

.text-white {color: #E5E7EB;}
.text-grey {color: #6B7280;}
.text-red {color: #EF4444;}
.text-orange {color: #FBBF24;}
.text-green {color: #10B981;}
.text-blue {color: #60a5fa;}
.text-purple {color: #3F19AC;}

.border-grey {border-color: #E5E7EB20;}
.border-red {border-color: #EF444480;}
.border-orange {border-color: #FBBF2480;}
.border-green {border-color: #10B98180;}

.op-40 {opacity: 40%;}

.fade-enter-active, .fade-leave-active {transition: opacity 0.5s ease;}
.fade-enter-from, .fade-leave-to {opacity: 0;}

.slide-fade-enter-active {transition: all .3s ease-out;}
.slide-fade-leave-active {transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.slide-fade-enter-from, .slide-fade-leave-to {transform: translateY(-20px); opacity: 0;}
</style>
