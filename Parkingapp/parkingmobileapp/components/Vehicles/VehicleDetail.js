import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { Keyboard, Platform, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import VehicleForm from "./VehicleForm";
import showToast from "../../utils/Toast";


const ios = Platform.OS === 'ios'
const VehicleDetail = ({ route }) => {
    const vehicle = route.params?.vehicle
    const { top } = useSafeAreaInsets();
    const nav = useNavigation();
    const info = [{
        label: "Tên phương tiện",
        field: "name",
    }, {
        label: "Biển số xe",
        field: "license_plate",
    }, {
        label: "Hình ảnh phương tiện",
        field: "image",
    }]
    const [newVehicle, setNewVehicle] = useState(vehicle)

    const setState = (value, field) => {
        setNewVehicle({ ...newVehicle, [field]: value })
    }

    const updateVehicle = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            let form = new FormData()
            for (let key in newVehicle) {
                if (key === 'image') {
                    if (typeof (newVehicle.image) === 'object') {
                        form.append('image', {
                            uri: newVehicle.image?.uri,
                            name: newVehicle.image?.fileName,
                            type: newVehicle.image?.mimeType
                        })
                    }
                } else {
                    form.append(key, newVehicle[key])
                }
            }

            const res = await authApis(token).patch(endpoints['vehiclesDeltail'](vehicle.id), form)

            showToast('success', 'Chỉnh sửa thành công', 'Thông tin đã được chỉnh sửa')
            nav.goBack();
        } catch (e) {
            console.log("error loadvehicle: ", e)
            showToast('error', 'Thất bại', 'Đã xảy ra lỗi')
        }
    }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert("Permissions denied!");
            Linking.openSettings();
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setState(result.assets[0], 'image');
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={ios ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <LinearGradient
                        colors={['#8781FF', '#BFBCFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingTop: ios ? top : top + 10, alignItems: 'center', paddingVertical: 15 }}
                    >
                        <Text style={{ fontSize: 26, color: 'white', fontWeight: 'bold' }}>Chỉnh sửa phương tiện</Text>
                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 600 }}>Cập nhật thông tin phương tiện của bạn</Text>
                    </LinearGradient>
                    <VehicleForm
                        vehicle={newVehicle}
                        setVehicle={setNewVehicle}
                        info={info}
                        onSubmit={updateVehicle}
                        onCancel={() => nav.goBack()}
                        onPickImage={picker}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default VehicleDetail;