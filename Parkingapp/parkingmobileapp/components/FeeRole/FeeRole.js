import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native"
import { authApis, endpoints } from "../../configs/Apis";
import FeeRoleItem from "./FeeRoleItem";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


const ios = Platform.OS === 'ios'
const FeeRole = () => {
    const [feeRole, setFeeRole] = useState();
    const nav = useNavigation();
    const { top } = useSafeAreaInsets();


    const loadFeeRole = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await authApis(token).get(endpoints['feeRole'])
            if (res.status === 200) {
                setFeeRole(res.data)
            }
        } catch (e) {
            console.log("error loadFeeRole: ", e)
        }
    }

    const footer = () => {
        return (
            <View style={{ padding: 20, borderRadius: 10, borderColor: "#1C86EE", backgroundColor: 'rgba(30, 144, 255, 0.1)', borderWidth: 1 }}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Ionicons color="#1C86EE" name="information-circle-outline" size={24} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Thông tin bổ sung</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Ionicons color="#1C86EE" name="time-outline" size={24} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>Thời gian tính phí</Text>
                        <Text>Phí được tính theo ngày, làm tròn lên đến ngày tiếp theo.</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Ionicons color="#1C86EE" name="cash-outline" size={24} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>Phương thức thanh toán</Text>
                        <Text>Hỗ trợ thanh toán qua ví điện tử.</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Ionicons color="#1C86EE" name="checkmark-circle-outline" size={24} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>Cam kết dịch vụ</Text>
                        <Text>Bảo vệ an toàn, bồi thường thiệt hại theo quy định.</Text>
                    </View>
                </View>
            </View>
        )
    }

    useFocusEffect(
        useCallback(() => {
            loadFeeRole();
        }, [])
    )

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient
                colors={['#8781FF', '#BFBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingTop: ios ? top : top + 10, flexDirection: 'row', alignItems: 'center', justifyContent: '', paddingHorizontal: 10 }}
            >
                <TouchableOpacity
                    onPress={() => nav.goBack()}
                    style={{ padding: 10, flex: 3 }}>
                    <Ionicons color='white' name="arrow-back-outline" size={24} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", flex: 7 }}>Bảng giá gửi xe</Text>
            </LinearGradient>
            <FlatList
                data={feeRole}
                keyExtractor={item => `feeRole${item.id}`}
                style={{ paddingHorizontal: 10, marginTop: 10 }}
                renderItem={({ item }) => <FeeRoleItem item={item} />}
                ListFooterComponent={footer}
            />
        </View>
    )
}

export default FeeRole;