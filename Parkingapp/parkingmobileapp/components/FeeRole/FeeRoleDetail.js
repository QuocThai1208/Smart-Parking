import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Card, Switch, Text, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import { useEffect, useState } from "react";


const ios = Platform.OS === 'ios';
const FeeRoleDetail = ({ route }) => {
    const { top } = useSafeAreaInsets();
    const nav = useNavigation();
    const feeRole = route.params?.feeRole
    const nameIcon = route.params?.nameIcon
    const infoVehicle = route.params?.infoVehicle
    const iconStatus = route.params?.iconStatus
    const [amount, setAmount] = useState(feeRole.amount);
    const [active, setActive] = useState(feeRole.active);
    const [effectiveFrom, setEffectiveFrom] = useState({ day: '', month: '', year: '' })
    const [effectiveTo, setEffectiveTo] = useState({ day: '', month: '', year: '' })



    const pardeDate = (dateString, setState) => {
        if (typeof dateString !== 'string' || !dateString.includes('-')) {
            setState({ day: '', month: '', year: '' });
            return;
        }
        const [year, month, day] = dateString.split('-');
        setState({ day, month, year });
    }

    const formatDate = ({ day, month, year }) => {
        if (!day || !month || !year) return null;
        return `${year}-${month}-${day}`;
    }

    const deleteFeeRole = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await authApis(token).delete(endpoints['feeRoleDetail'](feeRole.id))
            nav.goBack()
        } catch (e) {
            console.log("error deleteFeeRole: ", e)
        }
    }

    const updateFeeRole = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const ef = formatDate(effectiveFrom)
            const et = formatDate(effectiveTo)
            const data = {
                amount: amount,
                active: active,
                ...(ef && { effective_from: ef }),
                ...(et && { effective_to: et }),
            }
            const res = await authApis(token).patch(endpoints['feeRoleDetail'](feeRole.id), data)
            if (res.status === 200) {
                nav.goBack()
            }
        } catch (e) {
            console.log("error deleteFeeRole: ", e)
        }
    }

    const InputGroup = ({ day = '', month = '', year = '', setState }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 20 }}>
                <View style={[Styles.inputGroup]}>
                    <Text style={{ marginBottom: 5 }}>Ngày</Text>
                    <TextInput
                        value={String(day)}
                        onChangeText={t => setState(prev => ({ ...prev, day: t }))}
                        placeholder="DD"
                        maxLength={2}
                        keyboardType="decimal-pad"
                        style={[Styles.inputDate]}
                    />
                </View>
                <View style={[Styles.inputGroup]}>
                    <Text style={{ marginBottom: 5 }}>Tháng</Text>
                    <TextInput
                        value={String(month)}
                        onChangeText={t => setState(prev => ({ ...prev, month: t }))}
                        placeholder="MM"
                        maxLength={2}
                        keyboardType="decimal-pad"
                        style={[Styles.inputDate]}
                    />
                </View>
                <View style={[Styles.inputGroup]}>
                    <Text style={{ marginBottom: 5 }}>Năm</Text>
                    <TextInput
                        value={String(year)}
                        onChangeText={t => setState(prev => ({ ...prev, year: t }))}
                        placeholder="YYY"
                        maxLength={4}
                        keyboardType="decimal-pad"
                        style={[Styles.inputDate]}
                    />
                </View>
            </View>
        )
    }

    useEffect(() => {
        pardeDate(feeRole.effective_from, setEffectiveFrom);
        pardeDate(feeRole.effective_to, setEffectiveTo);
    }, [])


    return (
        <KeyboardAvoidingView
            behavior={ios ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <LinearGradient
                        colors={['#8781FF', '#BFBCFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingTop: ios ? top : top + 10, paddingHorizontal: 15 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => nav.goBack()}
                                style={{ padding: 10 }}
                            >
                                <Ionicons name="arrow-back-outline" color="white" size={24} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Cập nhật phí gửi xe</Text>
                            <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => {
                                    Alert.alert(
                                        "Xác nhận",
                                        "Bạn chắc chắn xóa?",
                                        [
                                            {
                                                text: "Hủy",
                                                style: 'cancel'
                                            },
                                            {
                                                text: "Đồng ý",
                                                onPress: () => {
                                                    deleteFeeRole();
                                                }
                                            }
                                        ]
                                    )
                                }}
                            >
                                <Ionicons name="trash-outline" size={24} color="red" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ borderRadius: 8, padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)', marginRight: 10 }}>
                                    <Ionicons name={nameIcon} size={30} color="#1C86EE" />
                                </View>
                                <View style={{ justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{infoVehicle} (ID: {feeRole.id})</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>Phí hiện tại: {feeRole.amount}đ</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingLeft: 10, borderRadius: 10, marginBottom: 15 }}>
                                <Ionicons name={iconStatus} size={22} color='#00FF00' />
                                <Text style={{ fontSize: 16, color: 'white', marginLeft: 10 }}>Trạng thái: {feeRole.active ? 'Đang áp dụng' : 'Không áp dụng'}</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    <ScrollView>
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
                            <Text style={{ fontSize: 16, fontWeight: 500 }}>Số tiền (VNĐ)</Text>
                            <TextInput
                                value={String(amount)}
                                onChangeText={t => setAmount(t)}
                                style={[Styles.TextInput]}
                            />
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 500 }}>Trạng thái hoạt động </Text>
                                <Switch value={active} onValueChange={() => setActive(prev => !prev)} />
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 500 }}>Ngày có hiệu lực</Text>
                                <InputGroup {...effectiveFrom} setState={setEffectiveFrom} />
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 500 }}>Ngày có hết hiệu lực (Có thể để trống)</Text>
                                <InputGroup {...effectiveTo} setState={setEffectiveTo} />
                            </View>
                        </View>

                        <View
                            style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}
                        >
                            <TouchableOpacity
                                onPress={() => nav.goBack()}
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '48%', borderColor: '#ccc', borderWidth: 1, borderRadius: 10, paddingVertical: 10 }}
                            >
                                <Ionicons name="close-outline" size={24} />
                                <Text style={{ fontWeight: '600' }}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={updateFeeRole}
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '48%', backgroundColor: '#3897f1', borderRadius: 10, paddingVertical: 10 }}
                            >
                                <Ionicons color="white" name="save-outline" size={24} />
                                <Text style={{ color: 'white', fontWeight: '600' }}>Lưu những thây đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default FeeRoleDetail;