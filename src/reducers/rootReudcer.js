/**
 * Created by ljunb on 16/5/25.
 * 根reducer
 */
import { combineReducers } from 'redux';
import Picture from './pictureReducer';
import PictureDetail from './pictureDetailReducer';
import Joke from './jokeReducer';
import News from './newsReducer';
import Weather from './weatherReducer';
import Gossip from './gossipReducer';

export default rootReducer = combineReducers({
    Picture,
    PictureDetail,
    Joke,
    News,
    Weather,
    Gossip
})