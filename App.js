import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import { CheckBox, Input, Button, Text } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Finish homework', completed: false },
    { key: '2', description: 'Go to the gym', completed: true },
    { key: '3', description: 'Buy groceries', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;

    const taskToAdd = {
      key: Date.now().toString(),
      description: newTask,
      completed: false,
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask('');
  };

  const toggleTask = (taskKey) => {
    const updatedTasks = tasks.map((task) =>
      task.key === taskKey
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskCard}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleTask(item.key)}
          checkedColor="#b07d62"
          containerStyle={styles.checkboxContainer}
        />
        <Text
          style={[
            styles.taskText,
            item.completed ? styles.completedTaskText : null,
          ]}
        >
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.smallTitle}>MY TASKS</Text>
        <Text h3 style={styles.title}>TODO App</Text>
        <Text style={styles.subtitle}>
          Stay organized and keep track of your day
        </Text>
      </View>

      <View style={styles.inputCard}>
        <Input
          placeholder="Enter a new task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
          inputContainerStyle={styles.inputInner}
          containerStyle={styles.inputOuter}
          placeholderTextColor="#9a8f88"
        />
        <Button
          title="Add"
          onPress={addTask}
          buttonStyle={styles.addButton}
          titleStyle={styles.addButtonText}
        />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1eb',
    paddingHorizontal: 18,
    paddingTop: 25,
  },
  headerCard: {
    backgroundColor: '#fffaf6',
    padding: 22,
    borderRadius: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eadfd7',
  },
  smallTitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: '#9a7f70',
    marginBottom: 6,
  },
  title: {
    color: '#5c4335',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#7e6a5f',
  },
  inputCard: {
    backgroundColor: '#fffaf6',
    borderRadius: 20,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eadfd7',
  },
  inputOuter: {
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  inputInner: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6d8cf',
    borderRadius: 14,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#b07d62',
    borderRadius: 14,
    paddingVertical: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 30,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffaf6',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eadfd7',
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
    marginRight: 12,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  taskText: {
    fontSize: 17,
    color: '#4f3c32',
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#a09a96',
  },
});