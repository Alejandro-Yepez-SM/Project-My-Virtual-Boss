import { gql } from "@apollo/client";

export const addTaskMutation = gql`
  mutation addTask($tenant: TenantData!, $userId: String!, $task: TaskInput!) {
    addTask(tenant: $tenant, userId: $userId, task: $task) {
      id
      date
      isCompleted
      priority
      title
      description
      category
      startTime
      endTime
      source
    }
  }
`;

export const updateTaskMutation = gql`
  mutation updateTask(
    $tenant: TenantData!
    $userId: String!
    $date: AWSDate!
    $taskId: ID!
    $updates: TaskUpdateInput!
  ) {
    updateTask(
      tenant: $tenant
      userId: $userId
      date: $date
      taskId: $taskId
      updates: $updates
    ) {
      id
      title
      description
      isCompleted
      date
      priority
      category
      startTime
      endTime
      source
    }
  }
`;

export const completeTaskMutation = gql`
  mutation completeTask(
    $tenant: TenantData!
    $userId: String!
    $task: TaskCompletionInput!
    $completionParam: Boolean!
  ) {
    completeTask(
      tenant: $tenant
      userId: $userId
      task: $task
      completionParam: $completionParam
    ) {
      id
      title
      description
      isCompleted
      date
      priority
      category
      startTime
      endTime
      source
    }
  }
`;

export const deleteTaskMutation = gql`
  mutation deleteTask($tenant: TenantData!, $userId: String!, $taskId: ID!) {
    deleteTask(tenant: $tenant, userId: $userId, taskId: $taskId)
  }
`;
