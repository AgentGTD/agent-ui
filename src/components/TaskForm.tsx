import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Task, CreateTaskParams, UpdateTaskParams } from '../types/task';

type FormValues = CreateTaskParams;

interface BaseTaskFormProps {
  onCancel: () => void;
}

interface CreateTaskFormProps extends BaseTaskFormProps {
  task?: null;
  onSubmit: (values: CreateTaskParams) => Promise<void>;
}

interface UpdateTaskFormProps extends BaseTaskFormProps {
  task: Task;
  onSubmit: (id: string, values: UpdateTaskParams) => Promise<void>;
}

type TaskFormProps = CreateTaskFormProps | UpdateTaskFormProps;

export const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'pending',
    },
  });

  const handleFormSubmit: SubmitHandler<FormValues> = async (values) => {
    if (task) {
      await (onSubmit as (id: string, values: UpdateTaskParams) => Promise<void>)(task.id, values);
    } else {
      await (onSubmit as (values: CreateTaskParams) => Promise<void>)(values);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        rules={{ required: 'Title is required' }}
        render={({ field: { onChange, value } }: { field: { onChange: (value: string) => void; value: string } }) => (
          <>
            <TextInput
              label="Title"
              value={value}
              onChangeText={onChange}
              error={!!errors.title}
              style={styles.input}
            />
            {errors.title && (
              <HelperText type="error">{errors.title.message}</HelperText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }: { field: { onChange: (value: string) => void; value: string } }) => (
          <TextInput
            label="Description"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        )}
      />

      <View style={styles.buttons}>
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button mode="contained" onPress={handleSubmit(handleFormSubmit)} style={styles.button}>
          {task ? 'Update' : 'Create'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    marginLeft: 8,
  },
}); 