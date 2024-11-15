import { ThemedView } from "@/components/ThemedView";
import { Input, Label, TextArea } from "@/components/ui/Inputs";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { View, StyleSheet, Button, TextInput, Pressable } from "react-native";
import { useCallback, useState } from "react";
import { trainingRunService } from "@/services/trainingRunService";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Trainer, trainerService } from "@/services/trainersService";
import { Picker } from "@react-native-picker/picker";
import { Select } from "@/components/ui/Select";
import { ThemedText } from "@/components/ThemedText";
import { TrainerLabel } from "@/components/ui/Labels";

export default function AddRun() {
  const { id } = useLocalSearchParams();

  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [trainer, setTrainer] = useState<Trainer | null>(trainers[0]);

  const createRun = async () => {
    try {
      const result = await trainingRunService.createTrainingRun(
        id as string,
        type,
        trainer?.id as string,
        description
      );
      router.dismiss();
    } catch (error) {
      console.error("Error creating run:", error);
    }
  };

  const getTrainers = async () => {
    // Get all trainers
    const result = await trainerService.getTrainers();
    setTrainers(result);
  };

  useFocusEffect(
    useCallback(() => {
      getTrainers();
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Add Training Run",
          headerLeft: () => (
            <Button title="Cancel" onPress={() => router.back()} />
          ),
          headerRight: () => <Button title="Save" onPress={createRun} />,
        }}
      />
      <View style={{ flex: 1, gap: 24 }}>
        <View>
          <Label label="Type" />
          <Input onChange={setType} />
        </View>
        <View>
          <Label label="Trainer" />
          {/* <Input onChange={setTrainer} /> */}
          <View style={styles.labelContainer}>
            {trainers.map((trainerOption) => (
              <TrainerLabel
                label={trainerOption}
                selected={trainer?.id === trainerOption.id}
                onPress={() => setTrainer(trainerOption)}
              />
            ))}
          </View>
        </View>
        <View>
          <Label label="Description" />
          <TextArea numberOfLines={3} onChange={setDescription} />
        </View>
      </View>
      {/* <View>
        <PrimaryButton label="Create" onClick={createRun} fullWidth />
      </View> */}
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
