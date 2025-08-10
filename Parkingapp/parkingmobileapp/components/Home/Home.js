import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyUserConText } from "../../configs/Contexts";
import { Avatar, Button, Divider, Modal, Portal, RadioButton, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import ParkingLogItem from "./ParkingLogItem";
import { Ionicons } from "@expo/vector-icons";
import Styles from "./Styles";
import Filter from "../../utils/Filter";

const defaultAvatar = 'https://res.cloudinary.com/dpknk0a1h/image/upload/istockphoto-1337144146-612x612_tqyzh8.jpg'
const ios = Platform.OS === 'ios'
const formatTime = (minutes) => {
    const day = Math.floor(minutes / (60 * 24));
    const hours = Math.floor(minutes % (60 * 24) / 60);
    const remainingMinutes = minutes % 60;

    let result = "";
    if (day > 0) result += `${day}d`
    if (hours > 0) result += `${hours}h`
    result += `${remainingMinutes}m`
    return result
}

const Home = () => {
    const info_role = {
        CUSTOMER: "Khách hàng",
        ADMIN: "Quản lý",
        STAFF: "Nhân viên"
    }
    const user = useContext(MyUserConText);
    const { top, bottom } = useSafeAreaInsets();
    const [parkingLog, setParkingLog] = useState();
    const [totalPayment, setTotalPayment] = useState();
    const [countParkingLog, setCountParkingLog] = useState();
    const [totalTime, setTotalTime] = useState();
    const [visible, setVisible] = useState(false);
    const [valueFilter, setValueFilter] = useState('day');
    const [dateValue, setDateValue] = useState({ day: '', month: '', year: '' });
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const [my, setMy] = useState(true)

    const showFilter = () => setVisible(true);
    const hideFilter = () => setVisible(false);

    const handleReload = () => {
        setReloadTrigger(prev => prev + 1)
        hideFilter();
    }

    const loadTotalTime = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            let url = `${endpoints['totalTimeParking']}?day=${dateValue.day}&month=${dateValue.month}&year=${dateValue.year}&regimen=${my ? 'my' : 'all'}`
            const res = await authApis(token).get(url)
            if (res.status === 200) {
                setTotalTime(res.data.totalTime)
            }
        } catch (e) {
            console.log("error loadTotalTime", e)
        }
    }

    const loadCountParkingLog = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            let url = `${endpoints['countParking']}?day=${dateValue.day}&month=${dateValue.month}&year=${dateValue.year}&regimen=${my ? 'my' : 'all'}`
            const res = await authApis(token).get(url)
            if (res.status === 200) {
                setCountParkingLog(res.data.countParkingLog)
            }
        } catch (e) {
            console.log("error loadCountParkingLog: ", e)
        }
    }

    const loadTotalPayment = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            let url = `${endpoints['totalPayment']}?day=${dateValue.day}&month=${dateValue.month}&year=${dateValue.year}&regimen=${my ? 'my' : 'all'}`
            const res = await authApis(token).get(url)
            if (res.status === 200) {
                setTotalPayment(res.data.TotalPayment)
            }
        } catch (e) {
            console.log("error loadtotalPayment: ", e)
        }
    }

    const loadParkingLog = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            let url = `${endpoints['parkingLogs']}?day=${dateValue.day}&month=${dateValue.month}&year=${dateValue.year}&regimen=${my ? 'my' : 'all'}`
            const res = await authApis(token).get(url)
            if (res.status === 200) {
                setParkingLog(res.data)
            }
        } catch (e) {
            console.log("error loadparrkinglog: ", e)
        }
    }

    useEffect(() => {
        loadParkingLog();
        loadTotalPayment();
        loadCountParkingLog();
        loadTotalTime();
    }, [reloadTrigger, my])

    return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient
                colors={['#8781FF', '#BFBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingTop: ios ? top : top + 10 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Avatar.Image size={60} source={{ uri: user._j?.avatar || defaultAvatar }} />
                        <View style={{ justifyContent: 'space-evenly', marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>{user._j.full_name}</Text>
                                <TouchableOpacity
                                    onPress={() => setMy(prev => !prev)}
                                    style={{
                                        padding: 5,
                                        backgroundColor: my ? 'black' : 'white',
                                        borderRadius: 10,
                                        marginLeft: 10
                                    }}
                                >
                                    <Text style={{ color: my ? 'white' : 'black', fontWeight: 'bold' }}>{my ? 'Của tôi' : 'Tất cả'}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'white' }}>{info_role[user._j.user_role]}</Text>
                        </View>
                    </View>
                    <View>
                        <Ionicons onPress={showFilter} name="filter-outline" size={26} color='white' />
                    </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around', marginVertical: 10 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', alignSelf: 'center', marginBottom: 5 }}>{countParkingLog}</Text>
                        <Text style={{ color: "white", alignSelf: 'center' }}>Lần gửi</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', alignSelf: 'center', marginBottom: 5 }}>{formatTime(totalTime)}</Text>
                        <Text style={{ color: "white", alignSelf: 'center' }}>TB thời gian</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', alignSelf: 'center', marginBottom: 5 }}>{totalPayment} đ</Text>
                        <Text style={{ color: "white", alignSelf: 'center' }}>Tổng phí</Text>
                    </View>
                </View>
            </LinearGradient>

            <FlatList
                data={parkingLog}
                keyExtractor={item => `parkingLog${item.id}`}
                style={{ paddingHorizontal: 10, paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ParkingLogItem item={item} />}
                contentContainerStyle={{ paddingBottom: bottom + 180 }}
            />
            <Filter
                visible={visible}
                onDismiss={hideFilter}
                valueFilter={valueFilter}
                setValueFilter={setValueFilter}
                dateValue={dateValue}
                setDateValue={setDateValue}
                onApply={handleReload}
            />

        </View>
    )
}

export default Home;