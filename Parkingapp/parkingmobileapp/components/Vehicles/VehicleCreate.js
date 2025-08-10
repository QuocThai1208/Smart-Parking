import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { Text, } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import VehicleForm from "./VehicleForm";
import showToast from "../../utils/Toast";


const ios = Platform.OS === 'ios'
const VehicleCreate = () => {
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
    const [vehicle, setVehicle] = useState({})
    const [msg, setMsg] = useState('')

    const setState = (value, field) => {
        setVehicle({ ...vehicle, [field]: value })
    }

    const validate = () => {
        if (Object.values(vehicle).length === 0) {
            setMsg("Vui lòng nhập thông tin!");
            return false;
        }

        for (let i of info) {
            if (!(i.field in vehicle)) {
                setMsg(`Vui lòng nhập ${i.label}`);
                return false;
            }

            if (user[i.field].trim() === '') {
                setMsg(`Vui lòng nhập ${i.label}`);
                return false;
            }
        }
        setMsg("");
        return true;
    }

    const postVehicle = async () => {
        try {
            if (validate() === false) {
                showToast('info', 'Thông báo', msg)
                return
            }

            const token = await AsyncStorage.getItem("token")
            let form = new FormData()
            for (let key in vehicle) {
                if (key === 'image') {
                    form.append('image', {
                        uri: vehicle.image?.uri,
                        name: vehicle.image?.fileName,
                        type: vehicle.image?.mimeType
                    })
                } else {
                    form.append(key, vehicle[key])
                }
            }

            const res = await authApis(token).post(endpoints['vehicles'], form)

            showToast('success', 'Thành công', 'Thêm phương tiện thành công')
        } catch (e) {
            console.log("error loadvehicle: ", e)
            showToast('error', 'Thất bại', 'Thêm phương tiện thât bại')
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
                        <Text style={{ fontSize: 26, color: 'white', fontWeight: 'bold' }}>Thêm phương tiện mới</Text>
                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 600 }}>Điền thông tin phương tiện của bạn</Text>
                    </LinearGradient>
                    <VehicleForm
                        vehicle={vehicle}
                        setState={setVehicle}
                        info={info}
                        onSubmit={postVehicle}
                        onCancel={() => nav.goBack()}
                        onPickImage={picker}
                    />

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default VehicleCreate;