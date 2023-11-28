import { createSlice } from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        'column-1': [],
        'column-2': [],
        'column-3': [],
        'column-4':[],
        'count': 3,
        // 'task-1': { id: 'task-1', content: 'Task 1', date: '12.12.2023' },
        // 'task-2': { id: 'task-2', content: 'Task 2', date: '13.12.2023' },
        // 'task-3': { id: 'task-3', content: 'Task 3', date: '13.12.2023' },
    },
    reducers:{
        addTask(state,action){
            //Генерируем id задачи и обновляем их количество
            let num = parseInt(state['count']);
            num++;
            state['count'] = num;
            const task0 = 'task-';
            const myTask = task0.concat(state['count']);
            
            const date = new Date();
            const date1 = date.toLocaleDateString()

            state[action.payload.column].push(myTask);
            const task = {'id':myTask,'content':action.payload.value,'date':date1}
            console.log(task)
            state[myTask] = task
            localStorage.setItem('toolkit',JSON.stringify(state))
            
        },
        deleteTask(state,action){
            state[action.payload.column] = state[action.payload.column].filter((taskid) => taskid !== action.payload.task)
            delete state[action.payload.task]
            localStorage.setItem('toolkit',JSON.stringify(state))
        },
        syncTask(state,action){
            //Синхронизируем localStorage и Store
            let data = JSON.parse(localStorage.getItem('toolkit')) || null;
            for (const key in data) {
                state[key] = data[key]
            }
        },
        handleDragEndRed(state,action){
            console.log(action.payload.destinationColumn,action.payload.sourceColumn,action.payload.taskId)
            state[action.payload.destinationColumn].push(action.payload.taskId)
            state[action.payload.sourceColumn] = state[action.payload.sourceColumn].filter((taskId) => taskId !== action.payload.taskId)
            
            localStorage.setItem('toolkit',JSON.stringify(state))
        },
    }
})

export default toolkitSlice.reducer
export const { addTask, deleteTask, syncTask, handleDragEndRed } = toolkitSlice.actions
