import { fromEntries } from '@chakra-ui/utils';
import {useCallback} from 'react';
import {v4 as uuidv4} from 'uuid';
import {ColumnType} from '../utils/enums';
import { pickChackraRandomColor, swap } from '../utils/helpers';
import {TaskModel} from '../utils/models';
import useTaskCollection from './useTaskCollection';

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column: ColumnType) {
    const [tasks, setTasks] = useTaskCollection();

    const addEmptyTask = useCallback(() => {
        console.log(`Adding new empty task to ${column} column`);

        setTasks((allTasks) => {
            const columnTasks = allTasks[column];

            if(columnTasks.length >= MAX_TASK_PER_COLUMN) {
                console.log('Too many task!');
                return allTasks;
            }

            const newColumnTask: TaskModel = {
                id: uuidv4(),
                title: `New ${column} task`,
                color: pickChackraRandomColor('.300'),
                column,
            };

            return {
                ...allTasks,
                [column]: [newColumnTask, ...columnTasks],
            };
        });
    }, [column, setTasks]);

    const deleteTask = useCallback(
        (id: TaskModel['id']) => {
            console.log(`Removing task ${id}`);

        setTasks((allTasks) => {
            const columnTasks = allTasks[column];
            return {
              ...allTasks,
              [column]: columnTasks.filter((task) => task.id !== id),
            };
          });
        },
        [column, setTasks],
      );

    const updateTask = useCallback(
        (id: TaskModel['id'], updatedTask: Omit<Partial<TaskModel>, 'id'>) => {
          console.log(`Updating task ${id} with ${JSON.stringify(updateTask)}`);

          
          setTasks((allTasks) => {
            const columnTasks = allTasks[column];
            return {
              ...allTasks,
              [column]: columnTasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task,
              ),
            };
          });
        },
        [column, setTasks],
      );

      const dropTaskFrom = useCallback(
        (from: ColumnType, id: TaskModel['id']) => {
          setTasks((allTasks) => {
            const fromColumnTasks = allTasks[from];
            const toColumnTasks = allTasks[column];
            const movingTask = fromColumnTasks.find((task) => task.id === id);
    
            console.log(`Moving task ${movingTask?.id} from ${from} to ${column}`);
    
            if (!movingTask) {
              return allTasks;
            }
    
            return {
              ...allTasks,
              [from]: fromColumnTasks.filter((task) => task.id !== id),
              [column]: [{ ...movingTask, column }, ...toColumnTasks],
            };
          });
        },
        [column, setTasks],
      );


      const swapTasks = useCallback(
        (i: number, j: number) => {
          console.log(`Swapping task ${i} with ${j} in ${column} column`);

          setTasks((allTasks) => {
            const columnTasks = allTasks[column];
            return {
              ...allTasks,
              [column]: swap(columnTasks, i, j),
            };
          });
        },
        [column, setTasks],
      );

    return {
        tasks: tasks[column],
        addEmptyTask,
        updateTask,
        deleteTask,
        dropTaskFrom,
        swapTasks,
    };
}

export default useColumnTasks;