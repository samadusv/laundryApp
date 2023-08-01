import { StyleSheet, Text, View ,ScrollView,TouchableOpacity,Image, FlatList} from 'react-native'
import React from 'react'

const Services = () => {

    const services = [
        {
            id:"0",
            image:require("../images/washing.png"),
            name:"Washing"
        },
           {
            id:"1",
            image:require("../images/dirtShirt.png"),
            name:"Laundry"
        },
           {
            id:"2",
            image:require("../images/clothIroning.png"),
            name:"Wash and Iron"
        },
           {
            id:"3",
            image:require("../images/cleaning.png"),
            name:"Cleaning"
        },
        
    ]

    return (
        <View style={{marginTop:-3}}>
            <Text style={{fontSize:18,fontWeight:500,padding:8,color:"#708090"}}>Services Available</Text>
            <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={services} 
            renderItem={({item,index})=>{
                return(
                    <View key={index} style={{margin:10,backgroundColor:"#fff",padding:20,borderRadius:6,
                    alignItems:"center",marginTop:-4,marginBottom:20
                    }}>
                        <Image
                        source={item.image}
                        style={{height:77,width:80,resizeMode:"stretch",borderRadius:10}}
                        />
                        <Text style={{textAlign:"center",marginTop:6,color:"#000"}}>{item.name}</Text>
                    </View>
                )
            }}
            />
        </View>
    )
}

export default Services

const styles = StyleSheet.create({})