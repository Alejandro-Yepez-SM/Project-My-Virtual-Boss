import { gql } from "@apollo/client";

export const addTaskMutation = gql`
  mutation addTask($userId: String!, $task: TaskInput!) {
    addTask(userId: $userId, task: $task) {
      category
      currentProgress
      description
      id
      date
      isCompleted
      priority
      scheduledTime
      targetCount
      title
      source
      status
    }
  }
`;

export const updateTaskMutation = gql`
  mutation updateTask(
    $userId: String!
    $taskId: ID!
    $updates: TaskUpdateInput!
  ) {
    updateTask(userId: $userId, taskId: $taskId, updates: $updates) {
      category
      currentProgress
      description
      id
      date
      isCompleted
      priority
      scheduledTime
      targetCount
      title
      source
      status
    }
  }
`;

export const deleteTaskMutation = gql`
  mutation deleteTask($userId: String!, $taskId: ID!) {
    deleteTask(userId: $userId, taskId: $taskId)
  }
`;
