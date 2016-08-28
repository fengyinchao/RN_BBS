

import * as types from '../actions/actionTypes';

const initialState = {
    WeatherList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        //开始获取数据
        case types.FETCH_WEATHER_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })
        //拿到数据
        case types.RECEIVE_WEATHER_LIST:
            return Object.assign({}, state, {
                WeatherList: state.isLoadMore ? state.WeatherList.concat(action.weatherList) : action.weatherList,

                isRefreshing: false,
                isLoading: false,
            })
        //重置状态
        case types.RESET_STATE:
            return Object.assign({},state,{
                WeatherList:[],
                isLoading:true,
            })
        default:
            return state;
    }
}

export default weatherReducer;
