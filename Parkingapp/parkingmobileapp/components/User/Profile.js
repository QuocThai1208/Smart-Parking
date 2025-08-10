import { useContext } from "react";
import { Platform, TouchableOpacity, View } from "react-native"
import { Avatar, Divider, Text } from "react-native-paper";
import { MyDispatchContext, MyUserConText } from "../../configs/Contexts";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";

const defaultAvatar = 'https://res.cloudinary.com/dpknk0a1h/image/upload/istockphoto-1337144146-612x612_tqyzh8.jpg'
const ios = Platform.OS === 'ios'
const Profile = () => {
    const user = useContext(MyUserConText)
    const dispatch = useContext(MyDispatchContext)
    const { top } = useSafeAreaInsets();
    const nav = useNavigation();
    const infoUser = [{
        field: 'address',
        label: 'Địa chỉ:',
    },
    {
        field: 'birth',
        label: 'Năm sinh:',
    }
        , {
        field: 'age',
        label: 'Tuổi:',
    }]
    const nameIcon = {
        address: "location-outline",
        birth: "calendar-outline",
        age: "calendar-outline",
        logOut: "exit-outline",
        update: "pencil-outline",
    }
    const infoRole = {
        ADMIN: 'Quản lý',
        STAFF: 'Nhân viên',
        CUSTOMER: 'Khách hàng'
    }

    const logOut = () => {
        dispatch({
            "type": "logout"
        })
    }

    return (
        <View style={[Styles.container, { backgroundColor: 'white' }]}>
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['rgba(152, 16, 250, 0.7)', 'rgba(230, 0, 118, 0.7)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingTop: ios ? top : top + 10, alignItems: 'center' }}
                >
                    <Avatar.Image source={{ uri: user._j?.avatar || defaultAvatar }} size={100} />
                    <Text style={Styles.fullNameText}>{user._j.full_name}</Text>
                    <Text style={Styles.usernameText}>@{user._j.username}</Text>
                    <View style={Styles.roleBadge}>
                        <Ionicons name="person-outline" size={20} color={Styles.roleBadgeIcon.color} />
                        <Text style={Styles.roleBadgeText}>{infoRole[user._j.user_role]}</Text>
                    </View>
                </LinearGradient>

                <View style={Styles.infoSection}>
                    <Text style={Styles.infoSectionTitle}>Thông tin cá nhân</Text>
                    <Divider />

                    {infoUser.map(item => (
                        <View key={`user${item.field}`}
                            style={Styles.userInfoRow}
                        >
                            <View style={Styles.userInfoLabelContainer}>
                                <Ionicons color={Styles.roleBadgeIcon.color} name={nameIcon[item.field]} size={24} />
                                <Text style={{ fontSize: 18, marginLeft: 15 }}>{item.label}</Text>
                            </View>
                            <Text style={{ fontSize: 18 }}>{user._j[item.field]}</Text>
                        </View>

                    ))}
                </View>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
                <TouchableOpacity
                    onPress={() => nav.navigate("ProfileUpdate")}
                    style={Styles.buttonPrimary}
                >
                    <Ionicons name={nameIcon.update} size={24} color='white' />
                    <Text style={Styles.buttonPrimaryText}>Chỉnh sửa hồ sơ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={logOut}
                    style={Styles.buttonSecondary}
                >
                    <Ionicons name={nameIcon.logOut} size={24} color='rgba(255, 0, 0, 0.7)' />
                    <Text style={Styles.buttonSecondaryText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Profile;