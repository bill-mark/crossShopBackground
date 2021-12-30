import request from "@/utils/request";

export const analysis_save = (data) => {
    return request({
        url: " /analysis/analysis/save",
        method: "POST",
        data
    })
}



export const environment_index = data =>{
    return request({
        url:"/client_v1/environment/index",
        method:"POST",
        data,
    })
}

//环境 - 首页统计信息
export const environment_first_count = data =>{
    return request({
        url:"/client_v1/environment/first-count",
        method:"POST",
        data,
    })
}