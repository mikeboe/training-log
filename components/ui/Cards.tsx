import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { SecondaryButton } from "./Buttons";

type CardProps = {
  children: React.ReactNode;
  style?: object;
  onPress?: () => void;
  selected?: string;
  selectedValue?: string;
  headline?: string;
};

const Card = ({
  children,
  onPress,
  selected,
  selectedValue,
  headline,
  style,
}: CardProps) => {
  const isSelected = selected && selected === selectedValue;
  const theme = useColorScheme();
  const themedStyles = theme === "dark" ? darkStyles : styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        isSelected ? styles.cardSelected : styles.cardDefault,
        style,
        themedStyles.card,
      ]}
    >
      <View style={styles.cardContent}>
        {headline ? <Text style={styles.headline}>{headline}</Text> : null}
        {children}
      </View>
    </TouchableOpacity>
  );
};

type CardWithEditStateProps = {
  headline: string;
  view: React.ReactNode;
  edit: React.ReactNode;
  label?: string;
  saveFunction: () => void;
  disabled?: boolean;
  style?: object;
};

const CardWithEditState = ({
  headline,
  view,
  edit,
  label = "Edit",
  saveFunction,
  disabled = false,
  style,
}: CardWithEditStateProps) => {
  const [editing, setEditing] = useState(false);

  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Text style={styles.headline}>{editing ? "Editing" : headline}</Text>
        <View style={styles.buttonContainer}>
          {!editing && (
            <SecondaryButton
              onClick={() => setEditing(true)}
              label={label}
              disabled={disabled}
            />
          )}
          {editing && (
            <View style={styles.editButtons}>
              <TouchableOpacity
                onPress={() => setEditing(false)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEditing(false);
                  saveFunction();
                }}
                style={[styles.button, styles.saveButton]}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.content}>{editing ? edit : view}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  cardSelected: {
    borderColor: "#059669",
    borderWidth: 2,
    shadowColor: "#059669",
  },
  cardDefault: {
    borderColor: "#F3F4F6",
    borderWidth: 1,
  },
  cardContent: {
    padding: 16,
  },
  headline: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  buttonContainer: {
    marginLeft: 16,
  },
  editButtons: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  saveButton: {
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    padding: 16,
  },
});

// Dark mode styles can be added using useColorScheme hook
const darkStyles = StyleSheet.create({
  card: {
    backgroundColor: "#111827",
  },
  headline: {
    color: "#FFFFFF",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#111827",
  },
});

export { Card, CardWithEditState };
