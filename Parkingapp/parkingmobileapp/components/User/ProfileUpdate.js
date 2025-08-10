import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Avatar, Text, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyDispatchContext, MyUserConText } from "../../configs/Contexts";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import Styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import showToast from "../../utils/Toast";



const defaultAvatar = 'https://res.cloudinary.com/dpknk0a1h/image/upload/istockphoto-1337144146-612x612_tqyzh8.jpg'
const ios = Platform.OS === 'ios'
const ProfileUpdate = () => {
    const user = useContext(MyUserConText)
    const dispatch = useContext(MyDispatchContext)
    const [newUser, setNewUser] = useState();
    const { top } = useSafeAreaInsets()
    const nav = useNavigation();
    const info = [{
        field: 'avatar',
        label: 'Ảnh đại diện',
    }, {
        field: 'full_name',
        label: 'Tên đầy đủ',
    }, {
        field: 'username',
        label: 'Tên tài khoản',
    }, {
        field: 'address',
        label: 'Địa chỉ',
    }, {
        field: 'birth',
        label: 'Năm sinh',
    }]
    const nameIcon = {
        avatar: "image-outline",
        full_name: "person-outline",
        username: "person-outline",
        address: "location-outline",
        birth: "calendar-outline",
        save: "save-outline",
        close: "close-outline",
    }

    const setState = (value, field) => {
        setNewUser({ ...newUser, [field]: value })
    }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert("Permissions denied!");
            Linking.openSettings();
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setState(result.assets[0], 'avatar');
        }
    }

    const updateUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            let form = new FormData()
            for (let key in newUser) {
                if (key === 'avatar') {
                    form.append('avatar', {
                        uri: newUser.avatar?.uri,
                        name: newUser.avatar?.fileName,
                        type: newUser.avatar?.mineType
                    })
                } else {
                    form.append(key, newUser[key])
                }
            }
            const res = await authApis(token).patch(endpoints['currentUser'], form)
            if (res.status === 200) {
                dispatch({
                    "type": "login",
                    "payload": res.data
                })
                showToast('success', 'Thành công', 'Đã cập nhật thông tin')
                nav.goBack()
            }
        } catch (e) {
            console.log("error updateUser: ", e)
            showToast('error', 'Thất bại', 'Đã xãy ra lỗi')
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={ios ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <LinearGradient
                        colors={['rgba(152, 16, 250, 0.7)', 'rgba(230, 0, 118, 0.7)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ paddingTop: ios ? top : top + 10, alignItems: 'center' }}
                    >
                        <Avatar.Image source={{ uri: newUser?.avatar?.uri || user._j?.avatar || defaultAvatar }} size={100} />
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginTop: 10 }}>Chỉnh sửa hồ sơ</Text>
                        <Text style={{ color: 'white', fontWeight: 600, marginBottom: 10 }}>Cập nhật thông tin cá nhân của bạn</Text>
                    </LinearGradient>

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{
                            backgroundColor: 'white',
                            marginHorizontal: 20,
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 20,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4
                        }}>
                            {info.map(i => (
                                <View key={`update${i.field}`}>
                                    <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 15, marginBottom: 5 }}>
                                        <Ionicons name={nameIcon[i.field]} color='#9B30FF' size={22} />
                                        <Text style={{ marginLeft: 15, fontWeight: 500 }}>{i.label}</Text>
                                    </View>
                                    {i.field !== 'avatar' &&
                                        <TextInput
                                            onChangeText={(t) => setState(t, i.field)}
                                            placeholder={String(user._j[i.field]) || ''}
                                            style={[Styles.loginFormTextInput]}
                                        />}
                                    {i.field === 'avatar' &&
                                        <TouchableOpacity
                                            onPress={picker}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: 45
                                            }}>
                                            <Ionicons name="cloud-upload-outline" size={24} />
                                        </TouchableOpacity>}
                                </View>
                            ))}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={updateUser}
                                    disabled={newUser ? false : true}
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgba(152, 70, 250, 0.8)',
                                        paddingVertical: 10,
                                        borderRadius: 15,
                                        width: '49%',
                                        opacity: newUser ? 1 : 0.3
                                    }}
                                >
                                    <Ionicons name={nameIcon.save} size={24} color='white' />
                                    <Text style={{ color: 'white', fontWeight: 600, marginLeft: 10 }}>Lưu những thay đổi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => nav.goBack()}
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
                                    <Ionicons name={nameIcon.close} size={24} />
                                    <Text style={{ fontWeight: 600, marginLeft: 10 }}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ProfileUpdate;