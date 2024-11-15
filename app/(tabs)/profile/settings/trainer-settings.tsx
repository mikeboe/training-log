import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Trainer, trainerService } from "@/services/trainersService";
import { StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { Stack, useFocusEffect } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { Input, Label } from "@/components/ui/Inputs";
import { Card } from "@/components/ui/Cards";
import TrainerCard from "@/components/settings/TrainerCard";

export default function TrainerSettings() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");

  const getTrainers = async () => {
    // Get all trainers
    const result = await trainerService.getTrainers();
    setTrainers(result);
  };

  const addTrainer = async () => {
    // Add a trainer
    await trainerService.createTrainer(name);
    getTrainers();
    setAdding(false);
  };

  const updateTrainer = async (id: string, changedName: string) => {
    await trainerService.updateTrainer(id, changedName);
    getTrainers();
  };

  useFocusEffect(
    useCallback(() => {
      getTrainers();
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      {/* <Stack.Screen options={{ title: "Trainers", headerRight: () => <Button  }} /> */}
      {trainers.length > 0 ? (
        <FlatList
          data={trainers}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <TrainerCard name={item.name} id={item.id} save={updateTrainer} />
          )}
        />
      ) : (
        <ThemedText>No trainers found. Add one.</ThemedText>
      )}
      {adding ? (
        <View>
          <Label label="Name" />
          <Input onChange={(text) => setName(text)} />
          <PrimaryButton label="Save" onClick={addTrainer} />
        </View>
      ) : (
        <SecondaryButton label="Add Trainer" onClick={() => setAdding(true)} />
      )}

      {/* <FontAwesome
        size={20}
        name="plus"
        onPress={() => router.navigate("/(settings)/trainer-settings/add")}
      /> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
