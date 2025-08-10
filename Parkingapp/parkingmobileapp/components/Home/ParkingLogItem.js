import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Card, Divider, Text } from "react-native-paper"


const formatTime = (minutes) => {
    const day = Math.floor(minutes / (60 * 24));
    const hours = Math.floor(minutes % (60 * 24) / 60);
    const remainingMinutes = minutes % 60;

    let result = "";
    if (day > 0) result += `${day} ngày `
    if (hours > 0) result += `${hours} giờ `
    result += `${remainingMinutes} phút`
    return result
}

const ParkingLogItem = ({ item }) => {
    const [checkInTime, checkInDate] = item.check_in.split(" ");
    const [checkOutTime, checkOutDate] = item.check_out.split(" ");

    return (
        <Card style={{ marginTop: 10, backgroundColor: 'white' }}>
            <View style={{ paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ padding: 10, backgroundColor: 'rgba(30, 144, 255, 0.2)', borderRadius: 8, marginRight: 10 }}>
                        <Ionicons color="#1C86EE" name="car-sport-outline" size={24} />
                    </View>
                    <View>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{item.vehicle.name} - {item.vehicle.license_plate}</Text>
                        <Text>{item.fee_rule}</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'rgba(0, 205, 0, 0.2)', borderRadius: 10, marginRight: 10 }}>
                    <Text style={{ color: '#008B00', fontWeight: 500 }}>{item.status === 'OUT' ? "Đã ra" : "Đang gửi"}</Text>
                </View>
            </View>

            <Divider />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10 }}>
                <View>
                    <Text style={{ color: '#008B00', marginBottom: 5 }}><Ionicons name="location-outline" size={20} /> Vào</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 5 }}>{checkInTime}</Text>
                    <Text style={{ fontWeight: 600, opacity: 0.5 }}>{checkInDate}</Text>
                </View>
                <View>
                    <Text style={{ color: '#CD2626', marginBottom: 5 }}><Ionicons name="location-outline" size={20} /> Ra</Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 5 }}>{checkOutTime}</Text>
                    <Text style={{ fontWeight: 600, opacity: 0.5 }}>{checkOutDate}</Text>
                </View>
            </View>

            <Divider />
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons color="#1C86EE" name="time-outline" size={22} />
                    <Text style={{ fontWeight: 600, marginLeft: 10 }}>Thời gian: {formatTime(item.duration_minutes)}</Text>
                </View>
                <Text style={{ color: '#CD2626', fontWeight: 600, fontSize: 18 }}>{item.fee} đ</Text>
            </View>
        </Card>
    )
}

export default ParkingLogItem;