const Reducer = (state,action) => {
    switch(action.type){
        case 'LOADING' : 
            return {
                ...state,
                loading : !state.loading
            }
            case 'LOGIN' : 
            return {
                ...state,
                login : true
            }
            case 'LOGOUT' : 
            return {
                ...state,
                login : false
            }
        default : return state
    }
}

export default Reducer