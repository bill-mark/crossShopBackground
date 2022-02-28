<template>
    <router-view></router-view>
</template>
<script>
import {certify_latest_info_v2} from '@/api/authencation'

export default{
    name:'company_setting',
    watch: {
    '$route': function (to, from) {
        console.log(to)
        if(to.name == 'company_setting'){
           this.auth_info()
        }
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
             this.$router.push({name:'company_notac'})
             return
           }
           if(data.data.status == 1){
             this.com_info()
             return
           }
           
         }
       },

        async com_info(){
         let {data} = await certify_latest_info_v2({
             type:1
         })
         if(data.code ==200){
           if(data.data.status == 0){
             this.$router.push({name:'company_notac'})
             return
           }
           if(data.data.status == 1){
             this.$router.push({name:'company_faren_home'})
             return
           }
           if(data.data.status == 3){
             this.$router.push({name:'company_wait_act'})
             return
           }
            if(data.data.status == 5){
             this.$message.error('审核失败,'+data.data.reject_remark)
             r
           if(data.data.status == 6){
             this.$router.push({name:'company_check_act'})
             return
           }
           eturn
           }

          this.$router.push({name:'company_faren_home'})
           
         }
       },


    }
}
</script>
<style scoped lang="less">

</style>