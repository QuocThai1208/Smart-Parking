import Toast from "react-native-toast-message"

const showToast = (type, t1, t2) => {
    Toast.show({
        type: type,
        text1: t1,
        text2: t2,
        visibilityTime: 3000
    })
}
export default showToast