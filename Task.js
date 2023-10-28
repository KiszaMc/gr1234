import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity
} from 'react-native';


export default function Task({ text, completed, onEdit, onDelete, onToggleComplete, onReturn }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {completed ? (
          <Switch value={completed} onValueChange={onReturn} />
        ) : (
          <Switch value={completed} onValueChange={onToggleComplete} />
        )}
        <Text style={styles.itemText}>{text}</Text>
      </View>
      {!completed && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onEdit}>
            <View style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <View style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
