import React from 'react'
import { View, Text } from 'react-native'

const FormScreen = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Address :</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>City :                         </Text>
                </View>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>State :</Text>
                </View>
            </View>


            <View style={{flexDirection:'row', marginTop: 10, marginLeft: 10 }}>
                <View style={{marginTop:4,height:16,width:16,backgroundColor:'grey'}}></View>
                <Text style={{ fontSize: 16,marginLeft:5 }}>Select if billing address is same as home address</Text>
            </View>

            <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Address :</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>City :                         </Text>
                </View>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>State :</Text>
                </View>
            </View>


            
            <View style={{ marginTop: 30, marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Please write</Text>
            </View>

            <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>additional Notes</Text>
            </View>


            <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ fontSize: 18,fontWeight:'bold'}}>Select here to add images to the document.</Text> 
            </View>

            <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Please sign here .</Text>
            </View>

            <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Please date here .</Text>
            </View>
        </View>
    )
}

export default FormScreen