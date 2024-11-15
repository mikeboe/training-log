import React, { forwardRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";

type LabelProps = {
  label: string;
};

const Label = ({ label }: LabelProps) => {
  return <Text style={styles.label}>{label}</Text>;
};

type InputProps = {
  type?: "text" | "password" | "email" | "number" | "date";
  onChange: (text: string) => void;
  onBlur?: () => void;
  onKeyPress?: (e: any) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  style?: object;
};

const Input = ({
  type,
  onChange,
  name,
  placeholder,
  defaultValue,
  disabled,
  onBlur,
  onKeyPress,
  style,
}: InputProps) => {
  return (
    <TextInput
      onChangeText={onChange}
      secureTextEntry={type === "password"}
      keyboardType={type === "number" ? "numeric" : "default"}
      placeholder={placeholder}
      defaultValue={defaultValue}
      editable={!disabled}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      style={[styles.input, style]}
    />
  );
};

type TextAreaProps = {
  onChange: (text: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  numberOfLines?: number;
  onKeyPress?: (e: any) => void;
};

const TextArea = forwardRef<TextInput, TextAreaProps>(
  (
    { onChange, placeholder, value, defaultValue, numberOfLines, onKeyPress },
    ref
  ) => {
    return (
      <TextInput
        ref={ref}
        onChangeText={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onKeyPress={onKeyPress}
        multiline
        numberOfLines={numberOfLines || 4}
        style={styles.textArea}
      />
    );
  }
);

type CheckBoxProps = {
  value?: boolean;
  label?: string;
  subLabel?: string;
  id?: string;
  name?: string;
  onChange?: (value: boolean) => void;
  height?: number;
  width?: number;
  defaultChecked?: boolean;
  disabled?: boolean;
};

const CustomCheckBox = ({
  value,
  label,
  subLabel,
  onChange,
  disabled,
}: CheckBoxProps) => {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox disabled={disabled} value={value} onValueChange={onChange} />
      <View style={styles.checkboxLabels}>
        <Text style={styles.checkboxLabel}>{label}</Text>
        <Text style={styles.checkboxSubLabel}>{subLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    width: "100%",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  checkboxLabels: {
    marginLeft: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  checkboxSubLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export { Label, Input, TextArea, CustomCheckBox };
