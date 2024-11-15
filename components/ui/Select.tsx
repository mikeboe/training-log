import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";

type SelectProps = {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
};

const LabeSelect = ({ options, value, onChange }: SelectProps) => {
  return (
    // <View style={styles.labelContainer}>
    //   {trainers.map((trainerOption) => (
    //     <View key={trainerOption.id}>
    //       <Pressable
    //         style={[
    //           styles.label,
    //           {
    //             borderColor:
    //               trainerOption.id === trainer?.id ? "blue" : "transparent",
    //           },
    //         ]}
    //         onPress={() => setTrainer(trainer)}
    //       >
    //         <ThemedText>{trainerOption.name}</ThemedText>
    //       </Pressable>
    //     </View>
    //   ))}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 64,
    flex: 1,
    gap: 12,
    justifyContent: "space-between",
  },
  labelContainer: {
    flexDirection: "row",
    gap: 8,
  },
  label: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
});

export { Select };
