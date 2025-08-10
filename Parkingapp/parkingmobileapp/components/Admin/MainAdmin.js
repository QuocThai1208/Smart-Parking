import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authApis, endpoints } from "../../configs/Apis";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


const ios = Platform.OS === 'ios'
const now = new Date()
const MainAdmin = () => {
    const { top } = useSafeAreaInsets();
    const [occupancy, setOccupancy] = useState();
    const [totalCustomer, setTotalCustomer] = useState();
    const [compareMonthly, setCompareMonthly] = useState();
    const [dayRevenue, setDayRevenue] = useState();
    const [countToday, setCountToday] = useState();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const nav = useNavigation();
    const infoFunction = [{
        nameIcon: "people-outline",
        label: 'Quản lý người dùng',
        sreem: ''
    }, {
        nameIcon: "stats-chart-outline",
        label: 'Xem doanh thu theo người dùng',
        sreem: 'RevenueByUser'
    }, {
        nameIcon: "car-sport-outline",
        label: "Quản lý phương tiện",
        sreem: ''
    }]

    const loadCountToday = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await authApis(token).get(endpoints['countToday'])
            setCountToday(res.data)
        } catch (e) {
            console.log("error loadCountToday", e)
        }
    }

    const loadOccupancy = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await authApis(token).get(endpoints['occupancy'])
            setOccupancy(res.data.occupancy)
        } catch (e) {
            console.log("error loadOccupancy", e)
        }
    }

    const loadTotalCustomer = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await authApis(token).get(endpoints['totalCustomer'])
            setTotalCustomer(res.data.totalCustomer)
        } catch (e) {
            console.log("error loadTotalCustomer", e)
        }
    }

    const loadCompareMonthly = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const url = `${endpoints['compareMonthly']}?month=${month}&year=${year}`
            const res = await authApis(token).get(url)
            setCompareMonthly(res.data)
        } catch (e) {
            console.log("error loadTotalCustomer", e)
        }
    }

    const loadDayRevenue = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const url = `${endpoints['revenue']}?day=${day}&month=${month}&year=${year}`
            const res = await authApis(token).get(url)
            setDayRevenue(res.data)
        } catch (e) {
            console.log("error loadTotalCustomer", e)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadOccupancy();
            loadTotalCustomer();
            loadCompareMonthly();
            loadDayRevenue();
            loadCountToday();
        }, [])
    )

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <LinearGradient
                colors={['#8781FF', '#BFBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingTop: ios ? top : top + 10, alignItems: 'center', paddingVertical: 15 }}
            >
                <Text style={{ fontSize: 26, color: 'white', fontWeight: 'bold' }}>Bảng điều khiển</Text>
                <Text style={{ fontSize: 16, color: 'white', fontWeight: 600 }}>Tổng quan về hệ thống</Text>
            </LinearGradient>

            <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', flex: 1 }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        width: '49%',
                        height: 100
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 600 }}>Doanh thu tháng này</Text>
                        <Ionicons name="cash-outline" size={24} color='#9B30FF' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 28, color: '#9B30FF', fontWeight: 600 }}>{compareMonthly?.revenue}</Text>
                        <Text style={{ fontSize: 16, color: '#9B30FF', fontWeight: 600 }}> đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name={compareMonthly?.change_percent > 0 ? "trending-up-outline" : "trending-down-outline"}
                            color={compareMonthly?.change_percent >= 0 ? 'green' : 'red'}
                            size={20}
                        />
                        <Text>{compareMonthly?.change_percent}% so với tháng trước</Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        width: '49%',
                        height: 100
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 600 }}>Doanh thu hôm nay</Text>
                        <Ionicons name="cash-outline" size={24} color='#9B30FF' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 28, color: '#9B30FF', fontWeight: 600 }}>{dayRevenue}</Text>
                        <Text style={{ fontSize: 16, color: '#9B30FF', fontWeight: 600 }}> đ</Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        width: '49%',
                        height: 100
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 600 }}>Tổng số khách hàng</Text>
                        <Ionicons name="people-outline" size={24} color='#9B30FF' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 28, color: '#9B30FF', fontWeight: 600 }}>{totalCustomer}</Text>
                        <Text style={{ fontSize: 16, color: '#9B30FF', fontWeight: 600 }}> người</Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        width: '49%',
                        height: 100
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 600 }}>Tổng số xe trong bãi</Text>
                        <Ionicons name="car-sport-outline" size={24} color='#9B30FF' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 28, color: '#9B30FF', fontWeight: 600 }}>{occupancy}</Text>
                        <Text style={{ fontSize: 16, color: '#9B30FF', fontWeight: 600 }}> xe</Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        width: '49%',
                        height: 100
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 600 }}>Xe gửi hôm nay</Text>
                        <Ionicons name="car-sport-outline" size={24} color='#9B30FF' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 28, color: '#9B30FF', fontWeight: 600 }}>{countToday}</Text>
                        <Text style={{ fontSize: 16, color: '#9B30FF', fontWeight: 600 }}> xe</Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 20,
                    marginHorizontal: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="settings-outline" size={24} color='#9B30FF' />
                    <Text style={{ fontSize: 18, fontWeight: 600, marginLeft: 10 }}>Chức năng quản lý</Text>
                </View>
                <Text style={{ fontWeight: 500, marginVertical: 5 }}>Truy cập các chức năng quản trị hệ thống</Text>
                <FlatList
                    data={infoFunction}
                    key={(item, index) => `function${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => nav.navigate(item.sreem)}
                            style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(155, 48, 255, 0.5)', marginTop: 10 }}
                        >
                            <Ionicons size={24} name={item.nameIcon} color='#9B30FF' />
                            <Text style={{ fontWeight: 600, marginLeft: 10 }}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

export default MainAdmin;