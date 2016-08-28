

import * as types from '../actions/actionTypes';

const initialState = {
    NewsList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let newsReducer = (state = initialState, action) => {
    switch (action.type) {
        //开始获取数据
        case types.FETCH_NEWS_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })
        //拿到数据
        case types.RECEIVE_NEWS_LIST:
            return Object.assign({}, state, {
                NewsList: state.isLoadMore ? state.NewsList.concat(action.newsList) : action.newsList,

                isRefreshing: false,
                isLoading: false,
            })
        //重置状态
        case types.RESET_STATE:
            return Object.assign({},state,{
                NewsList:[],
                isLoading:true,
            })
        default:
            return state;
    }
}

export default newsReducer;
