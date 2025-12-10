
const IngredientFieldCheck = ({ingredient, setIngredient,removeIngredient}) => {

  return (
    <div className="relative group pb-2">
      <label className="flex gap-x-2 items-center">
        <input
          type="checkbox"
          className="peer appearance-none h-5 w-5 shrink-0 rounded border-[#dce5df] dark:border-gray-600 border-2 bg-transparent text-bright-green checked:bg-bright-green checked:border-bright-green checked:bg-[image:--checkbox-tick-svg]"
        />
        <input
          type="text"
          className="h-10 px-3 rounded-lg text-base transition-colors duration-200 ease-in-out"

          onChange={(e)=>setIngredient(e.target.value)}
          value={ingredient}/>

          <button
          type="button"
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          onClick={()=>{
              if(confirm("Are you sure you want to remove this ingredient?")){
                  removeIngredient()
              }
          }
        }
        >
            <span className="material-symbols-outlined">close</span>
        </button>
      </label>
    </div>
  )
}

export default IngredientFieldCheck