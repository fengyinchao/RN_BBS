

import * as types from '../actions/actionTypes';

const initialState = {
    PictureList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let pictureReducer = (state = initialState, action) => {
    switch (action.type) {
        //开始获取数据
        case types.FETCH_PICTURE_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })
        //拿到数据
        case types.RECEIVE_PICTURE_LIST:
            return Object.assign({}, state, {
                PictureList: state.isLoadMore ? state.PictureList.concat(action.pictureList) : action.pictureList,

                isRefreshing: false,
                isLoading: false,
            })
        //重置状态
        // case types.RESET_PICTURE_LIST:
        //     return Object.assign({},{
        //         PictureList:action.pictureList,
        //         isLoading: true,
        //         isLoadMore: false,
        //         isRefreshing: false,
        //     })
        default:
            return state;
    }
}

export default pictureReducer;
