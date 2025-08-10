import { View, TouchableOpacity, Image } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Styles from "./Styles";


const VehicleForm = ({ vehicle, setVehicle, info, onSubmit, onCancel, onPickImage }) => {
    const setState = (value, field) => {
        setVehicle({ ...prev, [field]: value })
    }

    return (
        <View
            style={{
                backgroundColor: 'white',
                marginHorizontal: 20,
                borderRadius: 10,
                padding: 10,
                marginTop: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 4
            }}
        >
            <View style={{}}>
                {info.map(i =>
                    <View key={`createvehicle${i.field}`}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="car-sport-outline" size={22} color="#9B30FF" />
                            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 600 }}>{i.label}</Text>
                        </View>
                        {i.field !== 'image' && <TextInput
                            placeholder={i.label}
                            value={vehicle[i.field]}
                            onChangeText={t => setState(t, i.field)}
                            style={[Styles.textInput]}
                        />}
                        {i.field === 'image' && <View>
                            <TouchableOpacity
                                onPress={onPickImage}
                                style={{ backgroundColor: 'rgba(155, 48, 255, 0.2)', padding: 10, borderRadius: 10, width: '30%', alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: '#9B30FF', fontWeight: 'bold' }}>Chọn ảnh</Text>
                            </TouchableOpacity>
                            <Image style={{ width: '100%', height: 250, borderRadius: 10 }} source={{ uri: vehicle.image?.uri || vehicle?.image }} />
                        </View>}
                    </View>
                )}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity
                    onPress={onSubmit}
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(152, 70, 250, 0.8)',
                        paddingVertical: 10,
                        borderRadius: 15,
                        width: '49%',
                    }}
                >
                    <Ionicons name="save-outline" size={24} color='white' />
                    <Text style={{ color: 'white', fontWeight: 600, marginLeft: 10 }}>Lưu những thay đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onCancel}
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        borderRadius: 15,
                        width: '49%',
                        borderColor: '#ccc',
                        borderWidth: 1
                    }}
                >
                    <Ionicons name="close-outline" size={24} />
                    <Text style={{ fontWeight: 600, marginLeft: 10 }}>Hủy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VehicleForm;