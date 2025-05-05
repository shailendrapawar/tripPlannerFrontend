import { useSelector } from "react-redux"
import { IoAddCircle } from "react-icons/io5"
import { useState } from "react"
import { RiDeleteBackFill } from "react-icons/ri"

const Todos = ({ activities, setActivities }) => {
    const { theme } = useSelector(state => state.theme)
    const [input, setInput] = useState({
        day: "",
        activity: ""
    })
    const [todo, setTodo] = useState([])

    const addTodo = () => {
        if(input.day === "" || input.activity === "") {
            console.log("empty fields")
            return
        }
        const newTodo = { ...input, id: Date.now() }
        setTodo([...todo, newTodo])
        setInput({ day: "", activity: "" })
        setActivities(prev => [...prev, input])
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const removeTodo = (singleTodo) => {
        const filterTodo = todo.filter(item => singleTodo.id !== item.id)
        setTodo(filterTodo)
        setActivities(filterTodo)
    }

    return (
        <div className="w-full ">
            <h1 className="text-center mb-3 font-medium" style={{ color: theme.dark }}>
                Activities for trip
            </h1>
            
            {/* Input Section */}
            <section 
                className="flex w-full h-12 relative bg-white gap-1 rounded-md border-4"
                style={{ borderColor: theme.dark }}
            >
                <div className="absolute top-1 left-1 text-xs text-gray-500">DAY</div>
                <input 
                    value={input.day} 
                    onChange={handleChange} 
                    name="day" 
                    type="number" 
                    className="w-[15%] h-full text-center outline-none text-sm font-semibold" 
                    min="1"
                />
                
                {/* <div className="absolute top-1 left-[17%] text-xs text-gray-500">ACTIVITY</div> */}
                <input 
                    value={input.activity} 
                    onChange={handleChange} 
                    name="activity" 
                    type="text" 
                    className="w-[75%] h-full text-sm px-2 outline-none" 
                    placeholder="Enter activity for the day"
                />
                
                <button 
                    onClick={addTodo} 
                    className="w-[10%] h-full flex items-center justify-center hover:opacity-80"
                >
                    <IoAddCircle className="h-6 w-6" style={{ color: theme.dark }} />
                </button>
            </section>

            {/* Todo List */}
            <ul className="mt-3 max-h-60 flex flex-col gap-2 p-1 overflow-y-auto">
                {todo?.length > 0 ? (
                    todo.map((item) => (
                        <div 
                            key={item.id}
                            className="flex items-center min-h-10 h-auto px-3 py-2 bg-white rounded relative gap-2 border border-gray-300"
                        >
                            <b className="text-sm w-[15%]" style={{ color: theme.dark }}>
                                Day {item.day}:
                            </b>
                            <span className="text-sm w-[75%]">{item.activity}</span>
                            <RiDeleteBackFill 
                                onClick={() => removeTodo(item)} 
                                className="absolute right-3 cursor-pointer hover:text-red-500"
                                size={18}
                            />
                        </div>
                    ))
                ) : (
                    <span 
                        className="text-center text-sm py-4" 
                        style={{ color: theme.dark }}
                    >
                        Enter some activities for your trip
                    </span>
                )}
            </ul>
        </div>
    )
}

export default Todos