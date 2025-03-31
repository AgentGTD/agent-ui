import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton, useTheme } from 'react-native-paper';
import { Task } from '../types/task';
import { taskService } from '../services/taskService';
import { addEventListener } from '../utils/eventEmitter';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export const TaskList = ({ onEditTask }: TaskListProps) => {
  const theme = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();

    // Listen for tasksUpdated event
    const subscription = addEventListener('tasksUpdated', () => {
      loadTasks();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await taskService.listTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return theme.colors.primary;
      case 'in_progress':
        return theme.colors.secondary;
      default:
        return theme.colors.surfaceVariant;
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Title>{item.title}</Title>
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => onEditTask(item)}
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={() => handleDelete(item.id)}
            />
          </View>
        </View>
        <Paragraph>{item.description}</Paragraph>
        <View style={styles.footer}>
          <Button
            mode="contained"
            style={[styles.statusButton, { backgroundColor: getStatusColor(item.status) }]}
          >
            {item.status.replace('_', ' ').toUpperCase()}
          </Button>
          <Paragraph style={[styles.date, { color: theme.colors.outline }]}>
            Updated: {new Date(item.updatedAt).toLocaleDateString()}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderTask}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      refreshing={loading}
      onRefresh={loadTasks}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  statusButton: {
    borderRadius: 16,
  },
  date: {
    fontSize: 12,
  },
}); 