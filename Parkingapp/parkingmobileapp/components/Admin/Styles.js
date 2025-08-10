import { StyleSheet } from "react-native";

export default StyleSheet.create({
    table: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    header: {
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cell: {
        paddingVertical: 10,
    },
});
