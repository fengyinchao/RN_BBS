/**
 * Created by ljunb on 16/6/2.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Const from './const';

export default class Ceil extends React.Component {
    render() {
        return (
            <View style={styles.ceil}>
                <Text style={styles.loadingTitle}>{this.props.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   ceil: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})