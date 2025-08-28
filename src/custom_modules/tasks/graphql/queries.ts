import { gql } from "@apollo/client";

export const getTaskByUserQuery = gql`
  query getTasksByUser($userId: String!, $date: AWSDate) {
    getTasksByUser(userId: $userId, date: $date) {
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

export const getTaskQuery = gql`
  query getTask($userId: String!, $taskId: ID!) {
    getSingleTask(userId: $userId, taskId: $taskId) {
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
