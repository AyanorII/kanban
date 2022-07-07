import axios from "axios";
import { useEffect, useState } from "react";
import { Subtask, Task } from "./types";

/**
 * Hook to get subtasks of a task
 *
 * @param taskId The ID of the task containing the subtasks
 * @returns An object containing an array of subtasks, an array of completed subtasks, and a boolean indicating if the subtasks are loading
 */
export const useSubtasks = (taskId: number) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [completedSubtasks, setCompletedSubtasks] = useState<Subtask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSubtasks = async () => {
      const response = await axios(`/api/tasks/${taskId}/subtasks`);
      const data = await response.data as Subtask[];
      setSubtasks(data);

      const completed = data.filter((subtask: Subtask) => subtask.completed);
      setCompletedSubtasks(completed);

      setIsLoading(false);
    };

    getSubtasks();
  }, []);

  return { subtasks, completedSubtasks, isLoading };
};

/**
 * Hook to get tasks of a column
 * @param columnId The ID of the column containing the tasks
 * @returns An object containing an array of tasks and a boolean indicating if the tasks are loading
 */
export const useTasks = (columnId: number) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      const response = await axios(`/api/columns/${columnId}/tasks`);
      const data = await response.data as Task[];
      setTasks(data);
      setIsLoading(false);
    };

    getTasks();
  }, []);

  return { tasks, isLoading };
}
