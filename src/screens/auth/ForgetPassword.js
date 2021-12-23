import React, { useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Icon from "react-native-vector-icons/Ionicons"
import PassordIcon from "react-native-vector-icons/Entypo"
import ArrowIcon from "react-native-vector-icons/AntDesign"
import Btn from '../../components/Btn'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import ValidateEmail from '../../utils/validateEmail'
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import SuccessModel from '../../components/SuccessModal'

function ForgetPassword({navigation,forgetPassword}) {
    const [fields,setFields]=useState({
        email:"",
        password:""
    })
    const [submit,setSubmit]=useState(false)
    const [loading,setLoading]=useState(false)
    const getValue=(k,v)=>setFields({...fields,[k]:v})
    const [modal,setModal]=useState(false)
    const [error,setError]=useState(false)

    function onSubmit(){
        setSubmit(true)
        if(ValidateEmail(fields.email)){
            setLoading(true)
            forgetPassword(fields.email)
            .then(()=>{
                setModal(true)
                setLoading(false)
            })
            .catch(()=>{
                setError(true)
                setLoading(false)
            })
        }
    }
    return (
        <ImageBackground 
        source={require('../../../assets/login.png')}
        style={styles.con}>
            <SuccessModel
            title={"Password reset instructions has been successfully sent to your email"}
            reDirect={()=>navigation.goBack()}
            visible={modal}
            closeModle={()=>setModal(false)}
            />
            <ScrollView
            contentContainerStyle={{...styles.scr}}
            >
                <View style={styles.back}>
                    <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    >
                        <ArrowIcon
                        name="arrowleft"
                        color="grey"
                        size={responsiveFontSize(4)}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.img}>
                    <Image
                    style={styles.imgSrc}
                    source={require('../../../assets/logo.png')}
                    />
                </View>
                <Input
                name="Email Address"
                icon={ValidateEmail(fields.email)?(
                    ()=>(
                        <Icon
                        name="checkmark-circle-outline"
                        size={responsiveFontSize(3)}
                        color="green"
                        />
                    )
                ):null}
                value={fields.email}
                getValue={(v)=>getValue('email',v)}
                error={submit && !ValidateEmail(fields.email)?true:false}
                />
                {error?(
                    <Text style={{textAlign:'center',color:'red'}}>Please enter valid email</Text>
                ):null}
                <Btn
                text="Forget Password"
                call={onSubmit}
                loading={loading}
                />
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    con:{
        flex:1
    },
    scr:{
        alignSelf:'center',
        width:'95%',
        justifyContent:'flex-end',
        paddingBottom:responsiveFontSize(5)
    },
    img:{
        height:responsiveHeight(30),
        justifyContent:'center',
        alignItems:'center'
    },
    imgSrc:{
        width:responsiveFontSize(18),
        height:responsiveFontSize(18)
    },
    back:{
        height:responsiveFontSize(10),
        justifyContent:'center'
    },

})

export default connect(null,actions)(ForgetPassword)
