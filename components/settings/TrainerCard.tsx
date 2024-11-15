import { Trainer, trainerService } from "@/services/trainersService";
import { Card } from "../ui/Cards";
import { ThemedText } from "../ThemedText";
import { View, StyleSheet, Pressable } from "react-native";
import { Input } from "../ui/Inputs";
import { useState } from "react";

type TrainerCardProps = {
  id: string;
  name: string;
  save: (id: string, changedName: string) => void;
};

const TrainerCard = ({ id, name, save }: TrainerCardProps) => {
  const [changedName, setName] = useState(name);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    save(id, changedName);
    setEditing(false);
  };

  return (
    <Card>
      {editing ? (
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Input
              defaultValue={changedName}
              onChange={(text) => setName(text)}
            />
          </View>
          <View>
            <Pressable onPress={() => setEditing(false)}>
              <ThemedText>Cancel</ThemedText>
            </Pressable>
            <Pressable onPress={handleSave}>
              <ThemedText>Save</ThemedText>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <View>
            <ThemedText type="subtitle">{name}</ThemedText>
          </View>

          <Pressable onPress={() => setEditing(true)}>
            <ThemedText>Edit</ThemedText>
          </Pressable>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
});

export default TrainerCard;
