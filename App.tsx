import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Portal, Modal, FAB } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskList } from './src/components/TaskList';
import { TaskForm } from './src/components/TaskForm';
import { taskService } from './src/services/taskService';
import { Task } from './src/types/task';

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const handleCreateTask = async (values: any) => {
    try {
      await taskService.createTask(values);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (values: any) => {
    if (!selectedTask) return;
    try {
      await taskService.updateTask(selectedTask.id, values);
      setIsFormVisible(false);
      setSelectedTask(undefined);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedTask(undefined);
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <TaskList onEditTask={handleEditTask} />
          <Portal>
            <Modal
              visible={isFormVisible}
              onDismiss={handleCloseForm}
              contentContainerStyle={styles.modalContent}
            >
              <TaskForm
                initialValues={selectedTask}
                onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
                onCancel={handleCloseForm}
              />
            </Modal>
          </Portal>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => setIsFormVisible(true)}
          />
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
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
