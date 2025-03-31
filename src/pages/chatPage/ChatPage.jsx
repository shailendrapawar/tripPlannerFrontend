import { IoSearchCircle } from "react-icons/io5";
import { useSelector } from "react-redux"
import { BiSolidSend } from "react-icons/bi";
const ChatPage = () => {
  const { theme } = useSelector(s => s.theme)
  return (
    <div className="h-[90%]  w-full flex justify-center items-center">
      <section className="h-130 w-full max-w-170 flex bg-white p-1" style={{ border: `1px solid ${theme.primary}` }}>
        <aside className="w-1/3  pl-1 pr-1" style={{ backgroundColor: theme.dark, border: `1px solid ${theme.dark}` }}>
          <h3 className="text-center ">Groups</h3>

          <div className="w-full flex items-center mt-2 bg-white">
            <input type="text" className="bg-transparent w-[80%] outline-none text-xs pl-1"></input>
            <IoSearchCircle className="h-8 w-8" />
          </div>

          <div className="h-80 mt-2">
            list of groups
          </div>
        </aside>


        <main className="w-2/3 " style={{ backgroundColor: theme.pastel, }}>
          <div className="h-1/8 w-full " style={{ backgroundColor: theme.dark }}>

          </div>

          <section className="h-6/8 bg-white">
            chat body
          </section>

          <div className="h-1/8 bg-white flex items-center justify-evenly pl-1 pr-1 gap-1">
            <input type="text" placeholder="enter message" className=" h-8 w-5/6 rounded-md text-xs pl-1 pr-1 outline-gray-500 outline-2"></input>
            <span className="h-8 w-8 flex items-center justify-center rounded-full p-1 active:scale-95" style={{backgroundColor:theme.dark}}>
              <BiSolidSend className="h-full w-full text-white" />
            </span>
          </div>
        </main>

      </section>
    </div>
  )
}
export default ChatPage