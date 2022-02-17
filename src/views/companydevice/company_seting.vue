<template>
    <router-view></router-view>
</template>
<script>
import {certify_latest_info_v2} from '@/api/authencation'

export default{
    name:'company_setting',
    
    mounted(){
        //this.auth_info()
    },
    methods:{
       async auth_info(){
         let {data} = await certify_latest_info_v2({
             type:0
         })
         if(data.code ==200){
           if(data.data.status == 0){
             this.$router.push({name:'company_notac'})
           }
         }
       },
    }
}
</script>
<style scoped lang="less">

</style>