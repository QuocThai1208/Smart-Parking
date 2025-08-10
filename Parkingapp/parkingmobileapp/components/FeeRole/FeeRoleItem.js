import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper"
import { MyUserConText } from "../../configs/Contexts";

const infoVehicle = {
    CAR: "Ô tô",
    MOTORBIKE: "Xe máy"
}

const nameIcon = {
    CAR: "car-sport-outline",
    MOTORBIKE: "bicycle-outline",
    CALENDAR: "calendar-outline",
    false: "close-circle-outline",
    true: "checkmark-circle-outline"
}

const FeeRoleItem = ({ item }) => {
    const nav = useNavigation();
    const user = useContext(MyUserConText);

    return (
        <TouchableOpacity
            onPress={() => {
                if (user._j.user_role === "ADMIN" || user._j.user_role === "STAFF") {
                    nav.navigate("FeeRoleDetail", {
                        feeRole: item,
                        nameIcon: nameIcon[item.fee_type],
                        infoVehicle: infoVehicle[item.fee_type],
                        iconStatus: nameIcon[item.active]
                    })
                }
            }}>
            <Card style={{ backgroundColor: 'white', marginBottom: 10, padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ borderRadius: 8, padding: 10, backgroundColor: 'rgba(30, 144, 255, 0.2)', marginRight: 10 }}>
                            <Ionicons name={nameIcon[item.fee_type]} size={24} color="#1C86EE" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{infoVehicle[item.fee_type]}</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#008B00' }}>{item.amount}đ</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14, opacity: 0.7 }}>Mỗi ngày</Text>
                    </View>
                </View>

                <Divider />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, backgroundColor: item.active ? 'rgba(0, 205, 0, 0.2)' : 'rgba(238,0,0, 0.4)' }}>
                        <Ionicons name={nameIcon[item.active]} size={22} color={item.active ? '#00CD66' : '#EE0000'} />
                        <Text style={{ color: item.active ? '#008B00' : '#EE0000', fontWeight: 'bold', marginLeft: 5 }}>{item.active ? "Đang áp dụng" : "Không áp dụng"}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name={nameIcon.CALENDAR} size={22} />
                        <Text style={{ alignSelf: 'center', fontSize: 14, opacity: 0.7 }}>Từ {item.effective_from}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}
export default FeeRoleItem;