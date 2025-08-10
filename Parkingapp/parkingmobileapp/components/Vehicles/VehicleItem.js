import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Text, TouchableOpacity, View } from "react-native"
import { authApis, endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";
import showToast from "../../utils/Toast";

const VehicleItem = ({ item }) => {
    const nav = useNavigation();

    const deleteVehicle = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await authApis(token).delete(endpoints['vehiclesDeltail'](item.id))
            showToast('success', 'Xóa thành công', 'Phương tiện đã được xóa')
        } catch (e) {
            console.log("error deleteVehicle", e)
            showToast('error', 'Xóa thất bại', 'Đã xảy ra lỗi')
        }
    }

    return (
        <TouchableOpacity
            onPress={() => nav.navigate("VehicleDetail", { vehicle: item })}
            style={{
                flexDirection: "row",
                padding: 10,
                flexDirection: "row",
                backgroundColor: 'white',
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                justifyContent: 'space-between'
            }}>
            <View style={{ flexDirection: "row" }}>
                <Image style={{ width: 100, height: 100, borderRadius: 5, marginBottom: 5 }} source={{ uri: item.image }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: 500, fontSize: 18 }}>{item.name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, opacity: 0.7, marginBottom: 15 }}>{item.license_plate}</Text>
                    {item.is_approved ? <>
                        <View style={{ backgroundColor: '#00CD66', padding: 5, borderRadius: 50 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, alignSelf: 'center' }}>Đã phê duyệt</Text>
                        </View>
                    </> : <>
                        <View style={{ backgroundColor: '#EE0000', padding: 5, borderRadius: 50 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, alignSelf: 'center' }}>Chưa được phê duyệt</Text>
                        </View>
                    </>}
                </View>
            </View>
            <TouchableOpacity onPress={deleteVehicle}>
                <Ionicons name="trash-outline" size={24} color="#EE0000" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default VehicleItem;