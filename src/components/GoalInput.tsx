import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton, ActivityIndicator, useTheme } from 'react-native-paper';
import { openRouterService } from '../services/openRouterService';
import { taskService } from '../services/taskService';

interface GoalInputProps {
  onTasksCreated: () => void;
}

export const GoalInput = ({ onTasksCreated }: GoalInputProps) => {
  const theme = useTheme();
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!goal.trim() || loading) return;

    setLoading(true);
    try {
      const tasks = await openRouterService.breakDownGoal(goal);
      
      // Create all tasks
      await Promise.all(
        tasks.map(task => 
          taskService.createTask({
            ...task,
            status: 'pending',
          })
        )
      );

      setGoal('');
      onTasksCreated();
    } catch (error) {
      console.error('Failed to process goal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={goal}
        onChangeText={setGoal}
        placeholder="Enter your goal..."
        style={styles.input}
        right={
          loading ? (
            <TextInput.Icon icon={() => <ActivityIndicator size={20} />} />
          ) : (
            <TextInput.Icon
              icon="send"
              onPress={handleSubmit}
              disabled={!goal.trim() || loading}
            />
          )
        }
        onSubmitEditing={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
  },
}); 