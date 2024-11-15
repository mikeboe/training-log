import { ThemedText } from "../ThemedText";
import { Pressable, StyleSheet } from "react-native";

type LabelProps = {
  label: { id: string; name: string };
  selected: boolean;
  onPress: () => void;
};

const TrainerLabel = ({ label, selected, onPress }: LabelProps) => {
  return (
    <Pressable
      style={[
        styles.label,
        {
          borderColor: selected ? "#15803d" : "#9ca3af",
          backgroundColor: selected ? "#15803d" : "transparent",
        },
      ]}
      onPress={onPress}
    >
      <ThemedText>{label.name}</ThemedText>
    </Pressable>
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

export { TrainerLabel };
