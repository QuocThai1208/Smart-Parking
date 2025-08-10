import { FlatList, Platform, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import { useContext, useEffect, useState } from "react";
import { Avatar, Text } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { MyUserConText } from "../../configs/Contexts";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import WalletTransaction from "./WalletTransaction";
import { useNavigation } from "@react-navigation/native";



const ios = Platform.OS === 'ios'
const Wallet = () => {
    const user = useContext(MyUserConText)
    const [wallet, setWallet] = useState()
    const [showBalance, setShowBalance] = useState(false)
    const [walletTransaction, setWalletTransaction] = useState()
    const { top, bottom } = useSafeAreaInsets()
    const nav = useNavigation()

    const LoadWalletTransactions = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await authApis(token).get(endpoints['walletTransaction'])
            if (res.status === 200) {
                setWalletTransaction(res.data)
            }
        } catch (e) {
            console.log("error loadwalletTransactions: ", e)
        }
    }

    const LoadWallet = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await authApis(token).get(endpoints['wallet'])
            if (res.status === 200) {
                setWallet(res.data)
            }
        } catch (e) {
            console.log("error loaswallet: ", e)
        }
    }

    useEffect(() => {
        LoadWallet();
        LoadWalletTransactions();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Avatar.Image size={80} source={{ uri: 'https://res.cloudinary.com/dpknk0a1h/image/upload/istockphoto-1337144146-612x612_tqyzh8.jpg' }} />
                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{user._j.full_name}</Text>
                </View>
            </View>
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
                            {showBalance ? `${wallet?.balance || 0} đ` : '*********'}
                        </Text>
                        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                            <Ionicons
                                name={showBalance ? "eye-off-outline" : "eye-outline"}
                                size={28}
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Ionicons name="wallet-outline" color="white" size={34} />
                </View>
            </LinearGradient>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <TouchableOpacity
                    onPress={() => nav.navigate("TransactionOptions", { option: "DEPOSIT", wallet: wallet })}
                    style={{ borderWidth: 1, borderColor: '#B5B5B5', borderRadius: 10, width: 100, height: 100, alignItems: "center", justifyContent: 'center', marginRight: 10 }}>
                    <Ionicons name="arrow-down-outline" size={28} />
                    <Text style={{ fontSize: 16 }}>Nạp tiền</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => nav.navigate("TransactionOptions", { option: "WITHDRAW", wallet: wallet })}
                    style={{ borderWidth: 1, borderColor: '#B5B5B5', borderRadius: 10, width: 100, height: 100, alignItems: "center", justifyContent: 'center' }}>
                    <Ionicons name="arrow-up-outline" size={28} />
                    <Text style={{ fontSize: 16 }}>Rút tiền</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Giao dịch gần đây</Text>
                <FlatList
                    data={walletTransaction}
                    keyExtractor={item => `walletTransaction${item.id}`}
                    renderItem={({ item }) => <WalletTransaction item={item} />}
                    contentContainerStyle={{ paddingBottom: bottom + 280 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

export default Wallet;