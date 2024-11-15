import { Training, trainingsService } from "@/services/trainingsService";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { ThemedView } from "@/components/ThemedView";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Card } from "@/components/ui/Cards";
import { ThemedText } from "@/components/ThemedText";
import { TrainingRun, trainingRunService } from "@/services/trainingRunService";

type ItemProps = {
  item: {
    description: string;
    trainer: string;
    type: string;
    id: string;
    training_id: string;
  };
};

const Item = ({ item }: ItemProps) => (
  <Card>
    <ThemedText type="subtitle">{item.type}</ThemedText>
    <ThemedText>{item.trainer}</ThemedText>
    <ThemedText>{item.description}</ThemedText>
  </Card>
);

const Details = () => {
  const { id } = useLocalSearchParams();
  const { showActionSheetWithOptions } = useActionSheet();
  const [training, setTraining] = useState<Training | null>(null);
  const [runs, setRuns] = useState<TrainingRun[] | null>(null);

  const getTrainingById = async () => {
    const result = await trainingsService.getTrainingById(id as string);

    setTraining(result);
  };

  const getTrainingRuns = async () => {
    const result = await trainingRunService.getTrainingRuns(id as string);

    setRuns(result);
  };

  useFocusEffect(
    useCallback(() => {
      getTrainingById();
      getTrainingRuns();
    }, [])
  );

  const deleteTraining = async () => {
    try {
      await trainingsService.deleteTraining(id as string);
      router.back();
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  const onPress = () => {
    const options = ["Edit", "Add Run", "Delete", "Cancel"];
    const destructiveButtonIndex = options.length - 2;
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            router.push(`/(modals)/edit-training/${id}`);
            break;
          case 1:
            router.push(`/(modals)/add-run/${id}`);
            break;
          case destructiveButtonIndex:
            // Add delete logic here
            deleteTraining();
            console.log("Delete");
            break;
          case cancelButtonIndex:
            console.log("Cancel");
        }
      }
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: training?.name ?? "Details",
          headerRight: () => (
            <Pressable onPress={onPress}>
              <FontAwesome size={20} name="ellipsis-h" />
            </Pressable>
          ),
        }}
      />
      <View>
        <ThemedText type="title">{training?.name}</ThemedText>
        <ThemedText>{training?.date}</ThemedText>
        <ThemedText>{training?.location}</ThemedText>
      </View>
      {/* <Text>Details</Text>
      <Text>{training?.id}</Text>
      <Text>{training?.date}</Text>
      <Text>{training?.location}</Text>
      <Text>{training?.name}</Text> */}

      <FlatList
        data={runs}
        style={{ width: "100%", paddingTop: 16, flex: 1, gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});

export default Details;
