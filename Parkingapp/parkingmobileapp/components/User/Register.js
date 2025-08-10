import {
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Styles from "./Styles"
import { Avatar, Button, HelperText } from "react-native-paper";
import { useState } from "react";
import Apis, { endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";


const Register = () => {
    const info = [{
        placeholder: "Tên đầy đủ",
        field: "full_name",
        secureTextEntry: false,
    }, {
        placeholder: "Tên đăng nhập",
        field: "username",
        secureTextEntry: false,
    }, {
        placeholder: "Mật khẩu",
        field: "password",
        secureTextEntry: true,
    }, {
        placeholder: "Xác nhận mật khẩu",
        field: "confirm",
        secureTextEntry: true,
    }]

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState();
    const nav = useNavigation();
    const defaultAvatar = 'https://res.cloudinary.com/dpknk0a1h/image/upload/istockphoto-1337144146-612x612_tqyzh8.jpg';


    const setState = (value, field) => {
        setUser({ ...user, [field]: value })
    }


    const validate = () => {
        if (Object.values(user).length === 0) {
            setMsg("Vui lòng nhập thông tin!");
            return false;
        }

        if (!user.avatar) {
            setMsg('Vui lòng chọn ảnh đại diện')
            return false;
        }

        for (let i of info) {
            if (!(i.field in user)) {
                setMsg(`Vui lòng nhập ${i.placeholder}`);
                return false;
            }

            if (user[i.field].trim() === '') {
                setMsg(`Vui lòng nhập ${i.placeholder}`);
                return false;
            }
        }

        if (user.password !== user.confirm) {
            setMsg('Mật khẩu không khớp!');
            return false;
        }

        setMsg("");
        return true;
    }


    const HandleRegister = async () => {
        if (validate() === true) {
            try {
                setLoading(true);
                let form = new FormData();
                for (let key in user) {
                    if (key !== "confirm") {
                        if (key === "avatar") {
                            form.append('avatar', {
                                uri: user.avatar?.uri,
                                name: user.avatar?.fileName,
                                type: user.avatar?.mimeType
                            });
                        } else {
                            form.append(key, user[key]);
                        }
                    }
                }
                let res = await Apis.post(endpoints['users'], form);

                if (res.status === 201) {
                    nav.navigate("mainLogin")
                }
            } catch (error) {
                console.error("Register failed:", error.message);

            } finally {
                setLoading(false);
            }
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
                setState(result.assets[0], 'avatar');
        }
    }


    return (
        <KeyboardAvoidingView style={[Styles.container, { backgroundColor: 'rgba(30, 144, 255, 0.1)' }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ marginTop: 50, flex: 1 }} >
                    <View style={{ flex: 1 }}>
                        <Text style={Styles.welcomeText}>Tạo tài khoản mới</Text>
                        <Text style={Styles.subtitleText}>Đăng ký để bắt đầu sử dụng dịch vụ của chúng tôi</Text>
                        <View style={{ alignItems: "center" }}>
                            <Avatar.Image style={{ marginTop: 10, marginVertical: 10 }} size={100}
                                source={{ uri: user.avatar?.uri || defaultAvatar }} />
                        </View>
                        <View
                            style={Styles.inputWrapper}
                        >
                            <HelperText type="erroe" visible={msg}>{msg}</HelperText>
                            {info.map(i =>
                                <TextInput placeholder={i.placeholder}
                                    key={`Register${i.field}`}
                                    placeholderColor="#c4c3cb"
                                    style={Styles.loginFormTextInput}
                                    value={user[i.field]}
                                    secureTextEntry={i.secureTextEntry}
                                    onChangeText={t => setState(t, i.field)}
                                    keyboardType={i.field === "birth" ? "number-pad" : 'default'}
                                    maxLength={i.field === "birth" ? 4 : undefined}
                                />)}

                            <LinearGradient
                                colors={['#8781FF', '#BFBCFF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ borderRadius: 8, marginVertical: 10 }}
                            >
                                <TouchableOpacity disabled={loading} loading={loading} onPress={picker}
                                    style={Styles.buttonTouchable}
                                >
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>Chọn ảnh đại diện</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            <LinearGradient
                                colors={['#8781FF', '#BFBCFF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ borderRadius: 8 }}
                            >
                                <TouchableOpacity disabled={loading} loading={loading} onPress={HandleRegister}
                                    style={Styles.buttonTouchable}
                                >
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>Đăng ký</Text>
                                    <Ionicons name="arrow-forward-outline" color="white" size={24} />
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={Styles.footerContainer}>
                            <Text style={Styles.footerText}>Chưa có tài khoản?</Text>
                            <TouchableOpacity onPress={() => nav.goBack()}>
                                <Text style={Styles.footerLink}>Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: 60 }}>
                        <Text style={Styles.bottomText}>Bằng việc đăng ký bạn đồng ý với</Text>
                        <Text style={Styles.bottomText}>Điều khoản sử dụng  .  Chính sách bảo mật</Text>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Register;