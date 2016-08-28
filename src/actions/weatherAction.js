

import * as types from './actionTypes';
import Util from '../components/common/utils';

export let weather = (city, isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://apis.baidu.com/heweather/weather/free?city=';
    if (city) URL += city;
    
    console.log(URL)
    
    return dispatch => {
        dispatch(feachWeatherList(isLoadMore, isRefreshing, isLoading));
        return Util.gets(URL, (response) => {
             // console.log(response.showapi_res_body.contentlist)
             // let res=response.showapi_res_body.contentlist;
             // res.forEach(function(item){
             //    let text=item.text;
             //    // console.log(text)
             //    let reg=/<p>/g;
             //    text.replace(reg,'');
             //    item.text=text;
             //     // console.log(text)
             //    return item;
             // })
             
            dispatch(receiveWeatherList(response['HeWeather data service 3.0']))
            console.log(response['HeWeather data service 3.0'])
        }, (error) => {
            dispatch(receiveWeatherList([]));
        });

    }

}

function encode_utf8(s) {
    return encodeURIComponent(s);
}

let feachWeatherList = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_WEATHER_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveWeatherList = (weatherList) => {
    return {
        type: types.RECEIVE_WEATHER_LIST,
        weatherList: weatherList,
    }
}
