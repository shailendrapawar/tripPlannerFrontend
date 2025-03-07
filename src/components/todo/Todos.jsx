import { useSelector } from "react-redux"
import { IoAddCircle } from "react-icons/io5";
import { useState } from "react";
import { RiDeleteBackFill } from "react-icons/ri";
import "./todo.css"
const Todos = ({activities,setActivities}) => {

    const { theme } = useSelector(state => state.theme)

    const[input,setInput]=useState({
        day:"",
        activity:""
    })

    const[todo,setTodo]=useState([])

    const addTodo=()=>{
        
        if(input.day===""||input.activity===""){
            console.log("empty feilds")
            return
        }
        setTodo([...todo,{...input,id:Date.now()}])
        setInput({
            day:"",
            activity:"",
            
        })
        setActivities(prev=>[...prev,input])
    }

    const handleChange=(e)=>{
        const{name,value}=e.target;
        // console.log(value)
        setInput((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const removeTodo=(singleTodo)=>{
        // console.log(todo)
        const filterTodo=todo.filter((item)=>singleTodo.id!=item.id)
        setTodo(filterTodo)
        setActivities(filterTodo)
    }

    return (
        <div className="w-[320px] mt-5">
            <h1 className="text-center">Activities for trip</h1>
            <section className="flex w-full h-12 relative bg-white gap-1 rounded-md" style={{border:`4px solid ${theme.dark}`,}}>
                <input value={input.day} onChange={(e)=>handleChange(e)} name="day" type="number" className="w-[15%] h-full text-center outline-none text-xs font-semibold" ></input>
                <input value={input.activity} onChange={(e)=>handleChange(e)} name="activity" type="text" className="w-[75%] h-full text-xs pl-1 pr-1 outline-none text-center " placeholder="enter activity for the day"></input>
                <button onClick={()=>addTodo()} className="w-[10%] h-full text-xs flex items-center justify-center"><IoAddCircle className="h-7 w-7" /></button>
                <i className="absolute text-[8px] top-1 left-1">DAY</i>
                <i className="absolute text-[8px] left-13 top-1">activity</i>
            </section>

            <ul className=" todo-list max-h-60 h-auto flex flex-col gap-1 p-2 overflow-y-scroll">
                {
                    todo?.length>0?(todo.map((item,i)=>{
                        return <div className=" todo-item flex justify-start items-center min-h-10 h-auto pl-2 pr-2 pt-1 pb-1 bg-white relative gap-2 border-1 border-slate-500" key={i}>
                            <b className="text-xs w-[15%]" style={{color:theme.dark}}>Day {item.day} :</b><span className="text-xs w-[75%]">{item.activity}</span><RiDeleteBackFill onClick={()=>removeTodo(item)} className=" absolute right-2"/>
                        </div>
                    })):(<span className="text-center text-md" style={{color:theme.dark}}>Enter some activites for trip</span>)
                }
            </ul>

        </div>
    )
}
export default Todos