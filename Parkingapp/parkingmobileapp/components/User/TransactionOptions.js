import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useLayoutEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper";
import Styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";


const ios = Platform.OS == 'ios'
const TransactionOptions = ({ route }) => {
    const [amount, setAmount] = useState()
    const [description, setDescription] = useState()
    const option = route.params?.option
    const wallet = route.params?.wallet
    const nav = useNavigation()

    useLayoutEffect(() => {
        nav.setOptions({
            title: option === 'WITHDRAW' ? 'Rút tiền' : 'Nạp tiền'
        })
    }, [])

    const postTransaction = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            let url
            if (option === 'WITHDRAW') {
                url = endpoints['withdraw']
            } else {
                url = endpoints['deposit']
            }

            const res = await authApis(token).post(url, {
                amount: parseInt(amount),
                description: description
            })
            if (res.status === 200) {
                Alert.alert("Thông báo", "Giao dịch thành công",
                    [
                        {
                            text: "Đồng ý",
                            onPress: () => {
                                nav.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: "Wallet" }]
                                    })
                                )
                            }
                        }
                    ]
                )
            }

        } catch (e) {

            console.log("error loadtransaction: ", e)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={ios ? 'padding' : 'height'}
                    keyboardVerticalOffset={90}
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <LinearGradient
                            colors={['#8781FF', '#BFBCFF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ padding: 20, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                            <View>
                                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Tổng số dư</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 26, marginRight: 10 }}>
                                        {wallet.balance} vnđ
                                    </Text>

                                </View>
                            </View>
                            <View>
                                <Ionicons name="wallet-outline" color="white" size={34} />
                            </View>
                        </LinearGradient>

                        <TextInput
                            placeholder="Nhập số tiền"
                            style={{ backgroundColor: 'white' }}
                            onChangeText={t => setAmount(t)}
                            keyboardType="numeric"
                        />

                        <TextInput
                            placeholder="Mô tả"
                            style={{ backgroundColor: 'white' }}
                            onChangeText={t => setDescription(t)}
                        />
                        <Button
                            onPress={() => postTransaction()}
                            style={[Styles.button]} textColor="white">{option === 'WITHDRAW' ? 'Rút tiền' : 'Nạp tiền'}</Button>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default TransactionOptions;