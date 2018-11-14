import React, {Component} from 'react'

import { View, Text, FlatList, FlatListItem, TouchableOpacity, TextInput, Alert } from 'react-native'
import {styles} from '../styles/mainStyle'
import { getAllMaterials } from '../repository/allSchema'
import Swipeout from 'react-native-swipeout'

let FlatListItem = props =>  {
    const {itemIndex, id, title, subjectName, universityName, popupDialogComponent, onPressItem } = props
    showEditModal = () => {

    }
    showDeleteConfirmation = () => {
        Alert.alert (
            'Delete', 
            'Deletar um material',
            [
                {
                    text: 'Não', onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'Sim', onPress: () => {

                    }
                },
                { cancelable: true }
            ]
        )
    }

    return (
        <Swipeout right={[
            {
                text: 'Remover',
                backgroundColor: 'rgb[81, 134, 237]',
                onPress: showDeleteConfirmation
            }
        ]} autoClose= {true}>
        
        </Swipeout>
    )
}


export default class FavoriteTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            materialList: []
        }
    }

    reloadData = () => {
        getAllMaterials().then((materialList) => {
            this.setState({materialList})
        }).catch((error) => {
            this.setState({ materialList: []})
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.materialList}
                    style={styles.list}
                    renderItem={({item, index }) => <FlatListItem {...item} itemIndex={index}
                        popupDialogComponent={this.refs.popupDialogComponent}
                    onPressItem ={() => {
                        alert(`You pressed item`)
                    }} />}
                    keyExtractor={item => item.Id}
                    />
                <popupDialogComponent ref = {'popupDialogComponent'}/>
            </View>
        )
    }
}