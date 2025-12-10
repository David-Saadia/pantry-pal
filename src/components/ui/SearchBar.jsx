import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
const SearchBar = ({searchTerm,setSearchTerm}) => {

  return (
    <div className="flex items-center px-1 py-1 rounded-lg border-2">
        <span  className="material-symbols-outlined text-charcoal dark:text-gray-300 px-1 py-1"
        >
            Search
        </span>
        <Input type={"text"} placeholder={"Search for recipes..."} className="px-1 py-1 border-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}/>
    </div>
  )
}

export default SearchBar