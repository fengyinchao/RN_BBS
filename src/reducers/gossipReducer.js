

import * as types from '../actions/actionTypes';

const initialState = {
    GossipList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let gossipReducer = (state = initialState, action) => {
    switch (action.type) {
        //开始获取数据
        case types.FETCH_GOSSIP_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })
        //拿到数据
        case types.RECEIVE_GOSSIP_LIST:
            return Object.assign({}, state, {
                GossipList: state.isLoadMore ? state.GossipList.concat(action.gossipList) : action.gossipList,

                isRefreshing: false,
                isLoading: false,
            })
        //重置状态
        case types.RESET_STATE:
            return Object.assign({},state,{
                GossipList:[],
                isLoading:true,
            })
        default:
            return state;
    }
}

export default gossipReducer;
