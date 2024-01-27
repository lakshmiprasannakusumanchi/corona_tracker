import { FETCH_FAILURE,FETCH_SUCCESS,FETCH_REQUEST } from "./dataTypes"
const initialState={
    loading:false,
    data:{},
    error:''
}
export const reducer =(state=initialState,action)=>{
    switch(action.type) {
        case FETCH_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_SUCCESS:
            return{
                loading:false,
                data:action.payload,
                error:''
            }
        case FETCH_FAILURE:
            return{
                loading:false,
                data:{},
                error:action.payload
            }
        default:return state
    }
}
