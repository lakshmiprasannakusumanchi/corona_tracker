import { FETCH_FAILURE,FETCH_SUCCESS,FETCH_REQUEST } from "./dataTypes"
import axios from 'axios'
export const fetchdataRequest=()=>{
    return {
        type:FETCH_REQUEST
    }
}
export const fetchdataSuccess=(data)=>{
    return {
        type:FETCH_SUCCESS,
        payload:data
    }
}
export const fetchdataFailure=(error)=>{
    return {
        type:FETCH_FAILURE  ,
        payload:error
    }
} 
export const fetch=()=>{
    return (dispatch)=>{
        dispatch(fetchdataRequest)
        axios.get('https://api.rootnet.in/covid19-in/stats/latest')
        .then(response=>{
            const data=response.data.data
            dispatch(fetchdataSuccess(data))
        })
        .catch(error =>{
            const errorMsg=error.message
            dispatch(fetchdataFailure(errorMsg))
        })
    }
}