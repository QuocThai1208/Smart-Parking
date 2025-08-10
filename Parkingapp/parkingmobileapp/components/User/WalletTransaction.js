import { View } from "react-native"
import { Text } from "react-native-paper";

const WalletTransaction = ({ item }) => {
    return (
        <View style={{ borderWidth: 1, borderColor: '#B5B5B5', borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{item.description}</Text>
                <Text>{item.created_date}</Text>
            </View>
            <View>
                <Text style={{
                    color: item.transaction_type === 'WITHDRAW' ? 'red' : 'green',
                    marginBottom: 10,
                    fontSize: 14,
                    fontWeight: 600
                }}>
                    {item.transaction_type === 'WITHDRAW' ? '- ' : '+ '}{item.amount} đ
                </Text>
                <Text
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 20,
                        backgroundColor: item.transaction_type === 'WITHDRAW' ? '#FFFAFA' : 'black',
                        color: item.transaction_type === 'WITHDRAW' ? 'black' : 'white',
                        alignSelf: 'center'
                    }}
                >{item.transaction_type === 'WITHDRAW' ? 'Rút tiền' : 'Nạp tiền'}</Text>
            </View>
        </View>
    )
}

export default WalletTransaction;