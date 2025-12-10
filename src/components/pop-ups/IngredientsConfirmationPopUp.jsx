import {useState} from "react";
import IngredientFieldCheck from "@/components/pop-ups/IngredientFieldCheck";
import {Button} from "@/components/ui/button";

const IngredientsConfirmationPopUp = ({ingredients=[],isOpen,onClose,setIngredients}) => {


    if (ingredients.length === 0 || !isOpen)
        return null;

    function ingredientChange(newIngredient,index){
        const newIngredients = [...ingredients];
        newIngredients[index] = newIngredient;
        setIngredients(newIngredients);
        console.log(newIngredients);
    }

    function removeIngredient(index){
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    }

  return (
   <div className="fixed inset-0 bg-gray-900/40 dark:bg-gray-900/60 flex items-center justify-center p-4 z-[60]">
       <div className="bg-white border-2 border-gray-300 dark:border-gray-600 rounded-lg p-8 lg:p-5 flex flex-col items-center justify-center w-fit"
       >
           <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
               <div >
                   <h2 className="text-charcoal dark:text-white text-2xl lg:text-xl font-bold leading-tight tracking-tight px-4">
                       Confirm Scanned Ingredients
                   </h2>
                   <h4 className="text-gray-500 dark:text-white text-sm lg:text-base font-bold leading-tight tracking-tight px-4 pb-4">
                       Uncheck an item to edit the ingredient.
                   </h4>
               </div>
               <button
                   onClick={onClose}
                   className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
               >
                   <span className="material-symbols-outlined">close</span>
               </button>
           </div>


           <hr className="text-gray-300 pb-5"/>
           <div className="pb-5 w-full justify-items-center overflow-auto h-[30vh] scrollbar-hide">
               {ingredients.map((ingredient, index) => (
                   <IngredientFieldCheck  key={index} ingredient={ingredient} setIngredient={(newIngredient)=>ingredientChange(newIngredient,index)} removeIngredient={()=>removeIngredient(index)}/>
               ))}
           </div>


           <hr className="text-gray-300 pb-5"/>

           <div className="flex gap-4">
               <Button variant="secondary" type="button" onClick={onClose}>
                   Cancel
               </Button>
               <Button className="bg-emerald-green hover:bg-bright-green " type="button" >
                   Confirm
               </Button>
           </div>
       </div>
   </div>
  )
}

export default IngredientsConfirmationPopUp