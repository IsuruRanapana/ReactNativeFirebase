import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Button({labelText, onPress, customStyles}) {
    return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Text style={styles.label}>{labelText}</Text>
                </View>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // width: 150,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 7,
        marginTop: 20,
        backgroundColor: 'rgba(55, 5, 35, 1)',
    },
    label: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
});
