import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native"
import { DataTable, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "./Styles";
import Filter from "../../utils/Filter";
import { useNavigation } from "@react-navigation/native";


const ios = Platform.OS === 'ios'
const RevenueByUser = () => {
    const { top } = useSafeAreaInsets();
    const [revenue, setRevenue] = useState();
    const [byUser, setByUser] = useState();
    const [visible, setVisible] = useState(false);
    const [valueFilter, setValueFilter] = useState('day');
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const [dateValue, setDateValue] = useState({ day: '', month: '', year: '' });
    const nav = useNavigation();

    const showFilter = () => setVisible(true);
    const hideFilter = () => setVisible(false);

    const handleReload = () => {
        setReloadTrigger(prev => prev + 1)
        hideFilter();
    }
    const loadRevenue = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            let url = `${endpoints['revenue']}?day=${dateValue.day}&month=${dateValue.month}&year=${dateValue.year}`
            const res = await authApis(token).get(url)
            if (res.status === 200) {
                setRevenue(res.data)
            }
        } catch (e) {
            console.log("error loadRevenue: ", e)
        }
    }

    const loadByUser = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            let url = `${endpoints['revenueByUser']}?day=${dateValue.day}&month=${dateValue.month}&year=${dateValue.year}`
            const res = await authApis(token).get(url)
            if (res.status === 200) {
                setByUser(res.data)
            }
        } catch (e) {
            console.log("error loadByUser: ", e)
        }
    }

    useEffect(() => {
        loadRevenue();
        loadByUser();
    }, [reloadTrigger])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient
                colors={['#8781FF', '#BFBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingTop: ios ? top : top + 10, alignItems: 'center', paddingVertical: 15 }}
            >
                <Text style={{ fontSize: 26, color: 'white', fontWeight: 'bold' }}>Doanh thu theo người dùng</Text>
            </LinearGradient>

            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ marginBottom: 10, padding: 10 }}>
                        <Ionicons onPress={() => nav.goBack()} name="arrow-back-outline" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginBottom: 10, padding: 10 }}>
                        <Ionicons onPress={showFilter} name="filter-outline" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={{ borderRadius: 10, backgroundColor: '#ededf5ff', padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Ionicons name="cash-outline" size={22} color='#9B30FF' />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Tổng doanh thu: </Text>
                    </View>
                    <Text style={{ fontSize: 18, color: '#9B30FF', fontWeight: 'bold' }}>{revenue}đ</Text>
                </View>
                <DataTable style={[Styles.table]}>
                    <DataTable.Header style={[Styles.header]}>
                        <DataTable.Title style={[Styles.cell]}>
                            <Text style={{ fontWeight: 'bold' }}>Tên người dùng</Text>
                        </DataTable.Title>
                        <DataTable.Title style={[Styles.cell]}>
                            <Text style={{ fontWeight: 'bold' }}>Tổng doanh thu</Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                        data={byUser}
                        keyExtractor={(item, index) => `revenueByUser${index}`}
                        renderItem={({ item }) => (
                            <DataTable.Row style={[Styles.row]}>
                                <DataTable.Cell style={[Styles.cell]}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.user__username}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={[Styles.cell]}>
                                    <Text style={{ color: '#9B30FF', fontWeight: 'bold' }}>{item.total}đ</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        )}
                    />
                </DataTable>
            </View>
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

export default RevenueByUser;