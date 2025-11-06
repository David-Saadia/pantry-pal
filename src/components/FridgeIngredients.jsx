'use client';

import {useState} from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function FridgeIngredients({onOpenReceiptModal}) {
    const router = useRouter();
    const [ingredients, setIngredients] = useState([
        {id: 1, name: 'Flour'},
        {id: 2, name: 'Eggs'},
        {id: 3, name: 'Milk'},
        {id: 4, name: 'Butter'},
        {id: 5, name: 'Sugar'},
        {id: 6, name: 'Baking Powder'},
        {id: 7, name: 'Salt'},
        {id: 8, name: 'Vanilla Extract'},
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleAddIngredient = () => {
        if (inputValue.trim()) {
            const newIngredient = {
                id: Date.now(),
                name: inputValue.trim()
            };
            setIngredients([...ingredients, newIngredient]);
            setInputValue('');
        }
    };

    const handleRemoveIngredient = (id) => {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    };


    return (
        <section className="mt-12">
            <h2 className="text-charcoal dark:text-white text-2xl lg:text-3xl font-bold leading-tight tracking-tight px-4 pb-4">
                What's in Your Fridge?
            </h2>
            <div className="bg-white dark:bg-charcoal/50 rounded-lg p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                    <label className="flex flex-col flex-1">
                        <p className="text-charcoal dark:text-white text-base font-medium leading-normal pb-2">
                            Add an ingredient
                        </p>
                        <div
                            className="flex w-full items-stretch rounded-lg border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-emerald-green/50">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-white dark:bg-charcoal text-charcoal dark:text-white focus:outline-0 focus:ring-0 border-0 h-12 placeholder:text-medium-gray dark:placeholder:text-gray-500 p-3 text-base font-normal leading-normal rounded-l-lg"
                                placeholder="e.g., flour, eggs, milk..."
                            />
                            <button
                                onClick={handleAddIngredient}
                                className="text-medium-gray dark:text-gray-400 flex bg-gray-50 dark:bg-charcoal/50 items-center justify-center px-4 rounded-r-lg border-l border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/10"
                            >
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    </label>
                    <button
                        onClick={onOpenReceiptModal}
                        className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-emerald-green text-white text-base font-bold leading-normal tracking-wide hover:bg-emerald-green/90 shadow-sm"
                    >
                        <span className="material-symbols-outlined">receipt_long</span>
                        <span className="truncate">Upload Receipt</span>
                    </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {ingredients.slice(ingredients.length - 5, ingredients.length).map((ingredient) => (
                        <div
                            key={ingredient.id}
                            className="flex items-center gap-1.5 bg-emerald-green/10 text-emerald-green dark:bg-emerald-green/20 dark:text-emerald-green rounded-full py-1.5 px-3"
                        >
                            <span className="text-sm font-medium">{ingredient.name}</span>
                            <button
                                onClick={() => handleRemoveIngredient(ingredient.id)}
                                className="text-emerald-green/70 hover:text-emerald-green"
                            >
                <span className="material-symbols-outlined" style={{fontSize: '16px'}}>
                  close
                </span>
                            </button>
                        </div>
                    ))}
                    <Button variant="outline"
                    onClick={()=>{router.push('/my-fridge')}}>
                        See More
                    </Button>
                </div>
            </div>
        </section>
    );
}
