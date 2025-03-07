import { useSelector } from "react-redux"
const SearchList = ({data,fn}) => {
    const{theme}=useSelector(s=>s.theme)
    
  return (
    <li className=" flex justify-start items-center min-h-10 pl-1 w-full text-[12px] cursor-pointer " style={{backgroundColor:theme.pastel,color:theme.dark ,border:`1px solid ${theme.light}`}}
    onClick={()=>fn(data)}
    >{data.formatted}</li>
  )
}
export default SearchList