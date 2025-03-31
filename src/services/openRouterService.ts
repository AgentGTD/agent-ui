import { CreateTaskParams } from '../types/task';
import OpenAI from 'openai';

const OPENROUTER_API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('EXPO_PUBLIC_OPENROUTER_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'Task Manager App'
  }
});

export const openRouterService = {
  async breakDownGoal(goal: string): Promise<CreateTaskParams[]> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'openai/gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a task breakdown assistant. Break down the given goal into actionable tasks.
              Return the tasks as a JSON array of objects, where each object has:
              - title: string (task title)
              - description: string (task description)
              - priority: number (1-5, where 1 is highest)
              - estimated_duration: number (in minutes)
              - dependencies: string[] (array of task titles this task depends on)
              Example format:
              [
                {
                  "title": "Research project requirements",
                  "description": "Gather and analyze project requirements from stakeholders",
                  "priority": 1,
                  "estimated_duration": 120,
                  "dependencies": []
                }
              ]`
          },
          {
            role: 'user',
            content: `Break down this goal into actionable tasks: ${goal}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content in API response');
      }

      try {
        const parsedContent = JSON.parse(content);
        if (!Array.isArray(parsedContent)) {
          throw new Error('Response must be an array of tasks');
        }
        return parsedContent;
      } catch (parseError) {
        console.error('Failed to parse tasks:', parseError);
        throw new Error('Failed to parse tasks from API response');
      }
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }
}; 