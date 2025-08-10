import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { FlatList, Image, Platform, TouchableOpacity, View } from "react-native"
import { authApis, endpoints } from "../../configs/Apis"
import VehicleItem from "./VehicleItem"
import Styles from "./Styles"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { Text } from "react-native-paper"


const ios = Platform.OS == 'ios'

const VehicleList = () => {
    const [vehicles, setVehicles] = useState();
    const [vehicleStats, setVehicleStats] = useState();
    const nav = useNavigation();
    const { top } = useSafeAreaInsets();

    const loadVehicleStats = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const res = await authApis(token).get(endpoints['vehicleStats'])
            if (res.status === 200) {
                setVehicleStats(res.data)
            }
        } catch (e) {
            console.log("error loadVehicleStats", e)
        }
    }

    const loadVehicles = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const res = await authApis(token).get(endpoints['vehicles'])
            setVehicles(res.data)
        } catch (e) {
            console.log("error loadvehicles: ", e)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadVehicles();
            loadVehicleStats();
        }, [])
    )

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <LinearGradient
                colors={['#8781FF', '#BFBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingTop: ios ? top : top + 10, flex: 1 }}
            >
                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <TouchableOpacity
                        onPress={() => nav.navigate("VehicleCreate")}
                    >
                        <Ionicons name="add-circle-outline" size={28} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Phương tiện của tôi</Text>
                    <TouchableOpacity onPress={() => nav.navigate("FeeRole")}>
                        <Ionicons name="clipboard-outline" size={26} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                    <View>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>{vehicleStats?.total}</Text>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>Tổng xe</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>{vehicleStats?.approved}</Text>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>Đã duyệt</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>{vehicleStats?.pending}</Text>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>Chưa duyệt</Text>
                    </View>
                </View><FlatList
                    data={vehicles}
                    keyExtractor={item => `vehicle${item.id}`}
                    style={{ paddingHorizontal: 10 }}
                    renderItem={({ item }) => <VehicleItem item={item} />}
                />
            </LinearGradient>



        </View>
    )
}

export default VehicleList