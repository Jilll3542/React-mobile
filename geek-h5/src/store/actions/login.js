import request from "@/utils/request.js"

export const sendCode = (mobile) => {
    return async() => {
       await request.get(`/sms/codes/${mobile}`)
    }
}

export const saveToken = (payload )=>{
    return{
        type:"login/token",
        payload,
    }
}



//登录功能
export const login =(data)=>{
    return async (dispatch) =>{
        const res = await request({
             method: "post",
             url:"/authorizations",
             data
        })
        //保存token到redux中 
        dispatch(saveToken(res.data))
        console.log(res)
    }
}