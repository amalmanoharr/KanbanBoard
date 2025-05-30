import { Column ,Id, Task} from "../types";
import ThrashIcon from "../icons/ThrashIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
interface Props {
    column:Column;
    deleteColumn:(id:Id)=>void;
    updateColumn:(id:Id,title:string)=>void;
    createTask:(columnId:Id)=>void;
    deleteTask:(id:Id)=> void;
    updateTask:(id:Id,content:string)=>void;
    tasks:Task[];
}
const ColumnContainer = (props: Props) => {
    const {column,deleteColumn,updateColumn,createTask,tasks,deleteTask,updateTask} = props;
    const [editMode,setEditMode] = useState(false);
    const tasksIds = useMemo(()=>{
        return tasks.map(task => task.id)
    },[tasks])
    const {setNodeRef,attributes,listeners,transform,transition,isDragging} 
    = 
    useSortable({
        id:column.id,
        data:{
            type:"Column",
            column,
        },
        disabled:editMode,
    });
    const style = {
        transition,
        transform:CSS.Transform.toString(transform),
    };
    if(isDragging){
        return (
            <div ref={setNodeRef} style={style} className="bg-columnBackgroundColor opacity-40 border-2 border-rose-500 w-[350px] h-[500px] rounded-md max-h-[500px] flex flex-col">

            </div>
        )
    }

    return (
<div ref={setNodeRef} style={style} className="bg-columnBackgroundColor w-[350px] h-[500px] rounded-md max-h-[500px] flex flex-col">
    <div {...attributes} {...listeners} onClick={()=>{setEditMode(true)}} className="bg-mainBackgroundColor flex items-center justify-between text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4">
    <div className="flex gap-2">
    <div className="flex justify-center items-center px-2 py-1 text-sm rounded-full">
        {tasks.length}
    </div>
    {!editMode && column.title}
    {editMode && <input className="text-black bg-columnBackgroundColor focus:border-rose-500 border-rounded outline-none px-2" value={column.title} onChange={e=>updateColumn(column.id,e.target.value)} autoFocus onBlur={()=>{setEditMode(false)}} onKeyDown={e=>{if(e.key !== "Enter")return;setEditMode(false)}}></input>}
    </div>
    <button 
    onClick={()=>{
        deleteColumn(column.id);
    }}
    className="hover:bg-columnBackgroundColor rounded px-1 py-2"><ThrashIcon/></button>
    </div>
    
    {/* {column task container} */}
    <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
    <SortableContext items={tasksIds}>
    {tasks.map((task) => (<TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>))}</SortableContext></div>

    {/* {column footer} */}
    <button className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
    onClick={()=>{
        createTask(column.id);
    }}
    ><PlusIcon/>Add Task</button>
</div>
    )
}
export default ColumnContainer