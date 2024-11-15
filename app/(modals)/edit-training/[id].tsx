import { Training } from "@/services/trainingsService";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import { trainingsService } from "@/services/trainingsService";
import { ThemedView } from "@/components/ThemedView";
import { Input, Label } from "@/components/ui/Inputs";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function EditTraining() {
  const { id } = useLocalSearchParams();
  const [training, setTraining] = useState<Training | null>(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const getTrainingById = async () => {
      const result = await trainingsService.getTrainingById(id as string);
      setTraining(result);
      setName(result.name);
      setLocation(result.location);
      // setDescription(result.description);
      setDate(result.date || new Date().toISOString());
    };
    getTrainingById();
  }, [id]);

  const saveTraining = async () => {
    try {
      await trainingsService.updateTraining(id as string, name, date, location);
      router.back();
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };

  console.log("Training:", training);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Edit Training",
          headerLeft: () => (
            <Button title="Cancel" onPress={() => router.back()} />
          ),
          headerRight: () => <Button title="Save" onPress={saveTraining} />,
        }}
      />
      <View>
        <View>
          <Label label="Name" />
          <Input defaultValue={training?.name} onChange={setName} />
        </View>
        <View>
          <Label label="Location" />
          <Input defaultValue={training?.location} onChange={setLocation} />
        </View>
        {/* <View>
        <Label label="Description" />
        <Input defaultValue={training?.description} onChange={setDescription} />
      </View> */}
        <View>
          <Label label="Date" />
          <DateTimePicker
            value={new Date(date)}
            onChange={(date) =>
              setDate(new Date(date.nativeEvent.timestamp).toISOString())
            }
          />
        </View>
      </View>
      <View>
        <PrimaryButton label="Save" onClick={saveTraining} fullWidth />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 64,
    flex: 1,
    gap: 12,
    justifyContent: "space-between",
  },
});
