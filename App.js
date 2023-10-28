import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
} from 'react-native';
import Task from '/.Task.js';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    const taskToComplete = updatedTasks[index];
    taskToComplete.completed = true;
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== '') {
      if (editingIndex !== -1) {
        tasks[editingIndex].text = task;
        setEditingIndex(-1);
        setTask('');
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
        setTask('');
      }
    }
  };

  const handleEditTask = (index) => {
    setTask(tasks[index].text);
    setEditingIndex(index);
  };

  const handleDeleteTask = (index, completed) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    if (completed) {
      const updatedCompletedTasks = [...completedTasks];
      updatedCompletedTasks.splice(index, 1);
      setCompletedTasks(updatedCompletedTasks);
    }
  };

  const handleDeleteAllCompletedTasks = () => {
    setCompletedTasks([]);
  };

  const handleReturnToTasks = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    const taskToReturn = updatedCompletedTasks[index];
    taskToReturn.completed = false;
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
    setTasks([...tasks, taskToReturn]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          {tasks.map((item, index) => (
            <Task
              key={index}
              text={item.text}
              completed={item.completed}
              onEdit={() => handleEditTask(index)}
              onDelete={() => handleDeleteTask(index, false)}
              onToggleComplete={() => handleCompleteTask(index)}
              onReturn={() => {}} 
            />
          ))}
        </View>

        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Completed Tasks</Text>
          <TouchableOpacity onPress={handleDeleteAllCompletedTasks}>
            <View style={styles.deleteAllButton}>
              <Text style={styles.buttonText}>Delete All Completed</Text>
            </View>
          </TouchableOpacity>
          {completedTasks.map((item, index) => (
            <Task
              key={index}
              text={item.text}
              completed={item.completed}
              onDelete={() => handleDeleteTask(index, true)}
              onReturn={() => handleReturnToTasks(index)} 
            />
          ))}
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              {editingIndex === -1 ? '+' : 'Save'}
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  tasksWrapper: {
    paddingTop: 110,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    width: '70%',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: 'center',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addText: {
    fontSize: 24,
  },
  deleteAllButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
  },

  backgroundGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E7AC7', 
    backgroundImage: 'linear-gradient(45deg, #4E7AC7, #1E3A70)',
  }
});
