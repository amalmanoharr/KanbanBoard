// import { useState } from "react";
// import ThrashIcon from "../icons/ThrashIcon";
// import { Task } from "../types";
// import { useSortable } from "@dnd-kit/sortable";
// import {CSS} from "@dnd-kit/utilities";

// interface Props{
//     task:Task;
//     deleteTask:(id:Id) => void;
//     updateTask:(id:Id,content:string) => void;
// }

// function TaskCard({task,deleteTask,updateTask}:Props){
//     const [mouseIsOver,setMouseIsOver] = useState(false);
//     const [editMode,setEditMode] = useState(false);
 
//    const {setNodeRef,attributes,listeners,transform,transition,isDragging} 
//     = 
//     useSortable({
//         id:task.id,
//         data:{
//             type:"Task",
//             task,
//         },
//         disabled:editMode,
//     });

//      const style = {
//             transition,
//             transform:CSS.Transform.toString(transform),
//         };

//     const toggleEditMode = ()=>{
//         setEditMode((prev) => !prev);
//         setMouseIsOver(false);
//     }

//     if(isDragging){
//         return(
//             <div ref={setNodeRef}
//             style={style} className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative"/>
//         )
//     }
//     if(editMode){
//         return(
// <div 
// ref={setNodeRef}
// style={style}
// {...attributes}
// {...listeners}
// className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"

// >
//     <textarea className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none" autoFocus value={task.content} placeholder="Task content here" onBlur={toggleEditMode} onKeyDown={e=>{if(e.key === "Enter" && e.shiftKey){toggleEditMode}}} onChange={(e)=>updateTask(task.id,e.target.value)}></textarea></div>
//         )
//     }
//     return (
//         <div
//         ref={setNodeRef}
// style={style}
// {...attributes}
// {...listeners}
//         className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-pointer relative"
//         onMouseEnter={() => setMouseIsOver(true)}
//         onMouseLeave={() => setMouseIsOver(false)}
//         onClick={toggleEditMode}
//       >
//         <p className="text-white my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">{task.content}</p>
//         {mouseIsOver && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering edit
//               deleteTask(task.id);
//             }}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
//           >
//             <ThrashIcon />
//           </button>
//         )}
//       </div>
//     )
    
// }

// export default TaskCard;
import { useState } from "react";
import ThrashIcon from "../icons/ThrashIcon";
import { Task, Id } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      >
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          autoFocus
          value={task.content}
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-pointer relative"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={toggleEditMode}
    >
      <p className="text-white my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering edit
            deleteTask(task.id);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <ThrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;