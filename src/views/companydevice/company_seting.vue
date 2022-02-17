<template>
    <div class="setting_wrap">
        <not_ac v-if="step_now == 0" @go_authcation="go_authcation(1)"/>
        <faren_home v-if="step_now == 1" />
    </div>
</template>
<script>
import {certify_latest_info_v2} from '@/api/authencation'
import not_ac from './components/not_ac.vue'
import faren_home from './components/faren_home.vue'
export default{
    name:'company_setting',
    components:{
        not_ac,faren_home
    },
    data(){
        return {
           step_now:1,
        }
    },
    mounted(){
        this.auth_info()
    },
    methods:{
       async auth_info(){
         let {data} = await certify_latest_info_v2({
             type:0
         })
         if(data.code ==200){
           if(data.data.status == 0){
             //  this.step_now = 0
           }
         }
       },
       go_authcation(data){
           console.log(data)
              this.step_now = data
       }
    }
}
</script>
<style scoped lang="less">
.setting_wrap{

}
</style>