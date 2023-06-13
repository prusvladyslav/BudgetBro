import { StyleSheet, View } from "react-native";

export const Row = ({ children }: { children: any }): JSX.Element => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});

