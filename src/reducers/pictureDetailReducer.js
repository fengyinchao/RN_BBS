

import * as types from '../actions/actionTypes';

const initialState = {
    PictureDetailList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let pictureDetailReducer = (state = initialState, action) => {
    // console.log(action)
    
    switch (action.type) {
        case types.FETCH_PICTUREDETAIL_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })
            
        case types.RECEIVE_PICTUREDETAIL_LIST:
        
            // alert('action='+JSON.stringify(action));
            // debugger

            return Object.assign({}, state, {
                PictureDetailList: state.isLoadMore ? state.PictureDetailList.concat(action.pictureDetailList) : action.pictureDetailList,
                isRefreshing: false,
                isLoading: false,
            })

        case types.RESET_PICTUREDETAIL_LIST:
            return Object.assign({},{
                PictureDetailList:[],
                isLoading:true,
                isLoadMore: false,
                isRefreshing: false,
            })
        default:
            return state;
    }
}

export default pictureDetailReducer;
