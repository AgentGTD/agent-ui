import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Portal, Modal, FAB } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskList } from './src/components/TaskList';
import { TaskForm } from './src/components/TaskForm';
import { GoalInput } from './src/components/GoalInput';
import { Task, CreateTaskParams, UpdateTaskParams } from './src/types/task';
import { taskService } from './src/services/taskService';
import { emitEvent } from './src/utils/eventEmitter';

export default function App() {
  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setSelectedTask(null);
  };

  const handleCreateTask = async (params: CreateTaskParams) => {
    try {
      await taskService.createTask(params);
      hideModal();
      emitEvent('tasksUpdated');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (id: string, params: UpdateTaskParams) => {
    try {
      await taskService.updateTask(id, params);
      hideModal();
      emitEvent('tasksUpdated');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    showModal();
  };

  const handleTasksCreated = () => {
    emitEvent('tasksUpdated');
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <TaskList onEditTask={handleEditTask} />
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}
            >
              <TaskForm
                task={selectedTask}
                onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
                onCancel={hideModal}
              />
            </Modal>
          </Portal>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={showModal}
          />
          <GoalInput onTasksCreated={handleTasksCreated} />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80, // Moved up to make room for GoalInput
  },
});
