<template>
    <div class="setting_wrap">
        <not_ac v-if="step_now == 0" @go_authcation="go_authcation"/>
    </div>
</template>
<script>
import {certify_latest_info} from '@/api/authencation'
import not_ac from './components/not_ac.vue'
export default{
    name:'company_setting',
    components:{
        not_ac
    },
    data(){
        return {
           step_now:0,
        }
    },
    mounted(){
        this.auth_info()
    },
    methods:{
       async auth_info(){
         let {data} = await certify_latest_info({
             type:0
         })
         if(data.code ==200){
           if(data.data.status == 0){
               this.step_now = 0
           }
         }
       },
       go_authcation(){

       }
    }
}
</script>
<style scoped lang="less">
.setting_wrap{

}
</style>