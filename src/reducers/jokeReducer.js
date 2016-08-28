

import * as types from '../actions/actionTypes';

const initialState = {
    JokeList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let jokeReducer = (state = initialState, action) => {
    switch (action.type) {
        //开始获取数据
        case types.FETCH_JOKE_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })
        //拿到数据
        case types.RECEIVE_JOKE_LIST:
            return Object.assign({}, state, {
                JokeList: state.isLoadMore ? state.JokeList.concat(action.jokeList) : action.jokeList,

                isRefreshing: false,
                isLoading: false,
            })
        //重置状态
        case types.RESET_STATE:
            return Object.assign({},state,{
                JokeList:[],
                isLoading:true,
            })
        default:
            return state;
    }
}

export default jokeReducer;
