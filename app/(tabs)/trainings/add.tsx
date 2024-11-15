import { PrimaryButton } from "@/components/ui/Buttons";
import { Input, Label } from "@/components/ui/Inputs";
import { trainingsService } from "@/services/trainingsService";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import uuid from "react-native-uuid";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedView } from "@/components/ThemedView";

export default function AddTraining() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [location, setLocation] = useState("");

  const createTraining = async () => {
    try {
      const result = await trainingsService.createTraining(
        name,
        date,
        location
      );
      router.dismiss();
    } catch (error) {
      console.error("Error creating training:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View>
        <Label label="Name" />
        <Input onChange={setName} />
      </View>
      <View>
        {/* <Label label="Date" />
        <Input type="date" onChange={setDate} /> */}
        <DateTimePicker
          value={new Date(date)}
          onChange={(date) =>
            setDate(new Date(date.nativeEvent.timestamp).toISOString())
          }
        />
      </View>
      <View>
        <Label label="Location" />
        <Input onChange={setLocation} />
      </View>

      <View>
        <PrimaryButton label="Create" onClick={createTraining} fullWidth />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    gap: 12,
  },
});
