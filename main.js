import Vue from 'vue'
import { HappyScroll } from 'vue-happy-scroll'
import { Select, Button, Option, MessageBox, Notification, Message, Rate, Loading, Pagination, Input, InputNumber, Upload, Dialog, Radio, RadioGroup, Checkbox, CheckboxGroup, Avatar } from 'element-ui'
import VueModel from './components/public/model/index.js'

Vue.use(VueModel)
Vue.component('HappyScroll', HappyScroll)

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Rate)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Avatar)

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
