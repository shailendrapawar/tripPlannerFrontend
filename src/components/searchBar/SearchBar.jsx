import { useState } from "react"
import axios from "axios"
import SearchList from "./SearchList"
import { MdClear } from "react-icons/md";

const SearchBar = () => {

    const [query, setQuery] = useState("")
    const [suggestion, setSuggestion] = useState([])

    const handleChange = async (e) => {
        query.trim("")
        setQuery(e.target.value)
        if (query == "") {
            setSuggestion([])
            return
        }
        // console.log(query)
        const API_KEY = "bb727deab6e7474ba1acab98c798ddf4"
        
            var requestOptions = {
                method: 'GET',
            };
            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${API_KEY}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result)
                    setSuggestion(result.features || [])
                })
                .catch(error => {
                    // setSuggestion([])
                    console.log('error', error)
                });
       
    }

    const handleSelect = (data) => {
        console.log(data)
        setQuery(data.formatted)
        setSuggestion([])
    }


    return (
        <div className="  flex flex-col justify-center items-center">
            <div className="relative flex">
                <input type="text" placeholder="search for place" value={query} onChange={(e) => handleChange(e)} className="h-10 w-70 bg-white pl-2 rounded-md outline-none"></input>
                
                <MdClear onClick={()=>{setQuery("");setSuggestion([])}} className="absolute right-1 top-3"/>
            </div>
            {
                suggestion.length > 0 ? (<ul className="h-auto max-h-30 w-70 overflow-y-scroll ">
                    {suggestion.map((item, i) => <SearchList data={item?.properties} key={i} fn={handleSelect} />)}
                </ul>) : (<i></i>)
            }

        </div>
    )
}
export default SearchBar