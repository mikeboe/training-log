import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

type ButtonLoadingIndicatorProps = {
  type: "danger" | "default";
};

const ButtonLoadingIndicator = ({ type }: ButtonLoadingIndicatorProps) => {
  return (
    <View role="status">
      <ActivityIndicator
        size="small"
        color={type === "danger" ? "red" : "green"}
      />
      <Text style={{ color: "gray" }}>Loading...</Text>
    </View>
  );
};

type PrimaryButtonProps = {
  onClick?: () => void | Promise<void>;
  label: string | JSX.Element;
  type?: "submit" | "button";
  fullWidth?: boolean;
  disabled?: boolean;
};

const PrimaryButton = ({
  onClick,
  label,
  type,
  fullWidth,
  disabled,
}: PrimaryButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setLoading(true);
      try {
        await onClick();
      } catch (error) {
        console.error("Error during button click:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
      onPress={handleClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <ButtonLoadingIndicator type="default" />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

type SecondaryButtonProps = {
  onClick?: () => void | Promise<void>;
  label?: string;
  showBorder?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
};

const SecondaryButton = ({
  onClick,
  label,
  showBorder,
  fullWidth,
  disabled,
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.secondaryButton,
        showBorder && styles.bordered,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
      onPress={onClick}
      disabled={disabled}
    >
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
  secondaryButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  bordered: {
    borderWidth: 1,
    borderColor: "gray",
  },
});

export { PrimaryButton, SecondaryButton };
