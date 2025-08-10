import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Divider, Modal, RadioButton, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../components/Home/Styles";


const optionFilter = [
    { label: "Theo ngày", value: "day" },
    { label: "Theo tháng", value: "month" },
    { label: "Theo năm", value: "year" },
];

const timeFilter = [
    { label: "Ngày", placeholder: "DD", value: "day", maxLength: 2 },
    { label: "Tháng", placeholder: "MM", value: "month", maxLength: 2 },
    { label: "Năm", placeholder: "YYYY", value: "year", maxLength: 4 },
];

const Filter = ({ visible, onDismiss, valueFilter, setValueFilter, dateValue, setDateValue, onApply }) => {
    const handleChange = (key, value) => {
        setDateValue(prev => ({ ...prev, [key]: value }));
    };

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
                marginHorizontal: 10,
                borderRadius: 10,
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Bộ lọc</Text>
                        <Ionicons onPress={onDismiss} name="close-outline" size={24} />
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            marginVertical: 15,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}>
                            <Ionicons name="calendar-outline" size={24} />
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>Lựa chọn</Text>
                        </View>

                        <RadioButton.Group onValueChange={setValueFilter} value={valueFilter}>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                                {optionFilter.map((option, index) => (
                                    <TouchableOpacity
                                        onPress={() => setValueFilter(option.value)}
                                        key={`radioButton${index}`}
                                        style={[Styles.option, valueFilter === option.value && Styles.optionSelected]}
                                    >
                                        <Text
                                            style={[
                                                Styles.optionText,
                                                valueFilter === option.value && Styles.optionTextSelected,
                                            ]}
                                        >
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            marginBottom: 10,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}>
                            <Ionicons name="time-outline" size={24} />
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>Thời gian</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                            {timeFilter.map((item) => {
                                const isDisable =
                                    (valueFilter === "month" && item.value === "day") ||
                                    (valueFilter === "year" && (item.value === "day" || item.value === "month"));
                                return (
                                    <View key={`textInput${item.value}`} style={[Styles.inputGroup]}>
                                        <Text style={{ marginBottom: 5 }}>{item.label}</Text>
                                        <TextInput
                                            placeholder={item.placeholder}
                                            maxLength={item.maxLength}
                                            style={[Styles.input, isDisable && Styles.inputDisabled]}
                                            value={dateValue[item.value]}
                                            onChangeText={(t) => handleChange(item.value, t)}
                                            editable={!isDisable}
                                            keyboardType="decimal-pad"
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    <Divider />
                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDateValue({ day: "", month: "", year: "" });
                                onApply();
                            }}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                width: "48%",
                                justifyContent: "center",
                                padding: 10,
                            }}
                        >
                            <Ionicons name="refresh-outline" size={24} />
                            <Text style={{ fontWeight: "bold" }}>Đặt lại</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onApply}
                            style={{
                                borderRadius: 8,
                                width: "48%",
                                padding: 10,
                                backgroundColor: "black",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ color: "white", alignSelf: "center", fontWeight: "bold" }}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default Filter;
