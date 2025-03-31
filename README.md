# Task Manager Mobile App

A modern, intuitive task management application built with React Native and Expo, featuring AI-powered task breakdown capabilities.

## ✨ Features

- **Task Management**
  - Create, edit, and delete tasks
  - Track task status (pending, in progress, completed)
  - Beautiful and intuitive user interface
  - Real-time updates using custom event system

- **AI-Powered Task Breakdown**
  - Enter high-level goals and get detailed task breakdowns
  - Powered by OpenRouter's Gemini model
  - Smart task prioritization and dependency management
  - Estimated duration calculations

- **Technical Stack**
  - React Native with Expo
  - TypeScript for type safety
  - React Native Paper for UI components
  - OpenRouter API for AI capabilities
  - Custom event system for real-time updates

## 🛠️ Prerequisites

- Node.js 16 or higher
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## 🔧 Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```bash
   EXPO_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
   EXPO_PUBLIC_API_BASE_URL=https://openrouter.ai/api/v1
   EXPO_PUBLIC_TASK_API_BASE_URL=http://your_api_ip:4000
   EXPO_PUBLIC_OPENROUTER_MODEL=google/gemini-2.5-pro-exp-03-25:free
   ```

## 🚀 Getting Started

1. Start the development server:
   ```bash
   npx expo start
   ```

2. Run on your preferred platform:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## 📱 App Structure

### Components

- `TaskList`: Displays the list of tasks with status indicators
- `TaskForm`: Form for creating and editing tasks
- `GoalInput`: Input field for entering goals to be broken down into tasks

### Services

- `taskService`: Handles API communication for task operations
- `openRouterService`: Manages AI-powered task breakdown functionality

### Types

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}
```

## 🎨 UI/UX Features

- Material Design-inspired interface
- Smooth animations and transitions
- Status-based color coding
- Floating Action Button for quick task creation
- Modal forms for task creation/editing
- Loading indicators for async operations

## 🔄 Real-time Updates

The app uses a custom event system to handle real-time updates:
- `tasksUpdated`: Triggered when tasks are modified
- Automatic refresh of task list on changes

## 📦 Dependencies

- `expo`: ~52.0.41
- `react-native`: 0.76.7
- `react-native-paper`: ^5.13.1
- `react-hook-form`: ^7.55.0
- `@openrouter/ai-sdk-provider`: ^0.4.5
- `ai`: ^4.2.9
- `openai`: ^4.90.0

## 🔍 Development Tools

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- React Native DevTools for debugging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing React Native framework
- [OpenRouter](https://openrouter.ai/) for providing AI capabilities
- [React Native Paper](https://callstack.github.io/react-native-paper/) for the beautiful UI components 