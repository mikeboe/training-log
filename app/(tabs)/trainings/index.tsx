import { ThemedView } from "@/components/ThemedView";
import { useCallback, useState } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Card } from "@/components/ui/Cards";
import { Training, trainingsService } from "@/services/trainingsService";
import { ThemedText } from "@/components/ThemedText";

type ItemProps = {
  item: { name: string; id: string; location: string; date: string };
};

const Item = ({ item }: ItemProps) => (
  <Card onPress={() => router.push(`/(tabs)/trainings/${item.id}`)}>
    <ThemedText type="subtitle">{item.name}</ThemedText>
    <ThemedText>{item.location}</ThemedText>
    <ThemedText>{item.date}</ThemedText>
  </Card>
);

export default function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const getTrainings = async () => {
    const result = await trainingsService.getTrainings();
    console.log("Trainings:", result);
    setTrainings(result);
  };

  useFocusEffect(
    useCallback(() => {
      getTrainings();
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        style={{ width: "100%", padding: 16, flex: 1, gap: 12 }}
        data={trainings}
        renderItem={({ item }: any) => <Item item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        keyExtractor={(item: { id: string }) => item.id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
