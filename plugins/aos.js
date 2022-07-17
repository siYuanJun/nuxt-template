// 动画库
import AOS from 'aos'
import 'aos/dist/aos.css'
import { isBrowser } from '~/environment'

if (isBrowser) {
  AOS.init({
    duration: 1000,
  })
  window.AOS = AOS
}
