import { StyleSheet } from "react-native";

export default StyleSheet.create({
    option: {
        width: '48%',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
    },
    optionSelected: {
        backgroundColor: '#e0f2f1',
        borderColor: '#26a69a',
    },
    optionText: {
        fontSize: 16,
        color: '#000',
    },
    optionTextSelected: {
        color: '#00796b',
        fontWeight: 'bold',
    },
    inputGroup: {
        alignItems: 'center',
        width: '30%',
    },
    subLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        textAlign: 'center',
        width: '100%',
        height: 20,
    },
    inputDisabled: {
        backgroundColor: '#f2f2f2',
        color: '#999',
    },
});