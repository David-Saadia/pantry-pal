import RecipeCard from "@/components/RecipeCard";
import {useEffect} from "react";

const FavoriteRecipes = ({filteredRecipes,favoriteRecipes,setFavoriteRecipes,setFilterRecipes}) => {
    const handleRecipeDelete = (recipeId) => {
        if(confirm("Are you sure you want to delete this recipe?")){
            const updatedRecipes = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
            setFavoriteRecipes(updatedRecipes);
        }
    }

    useEffect(() => {
        setFilterRecipes((prev)=>prev.filter((recipe)=>favoriteRecipes.includes(recipe)));
    }, [favoriteRecipes]);

    return (
    <div>
        <div className="grid grid-cols-3 gap-6 pb-4">
            {filteredRecipes.map((recipe, index) => (
                <div key={recipe.id} style={index === filteredRecipes.length - 1 ? { marginRight: '1.5em' } : {}}>
                    <RecipeCard
                        key={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                        imageUrl={recipe.imageUrl}
                        imageAlt={recipe.imageAlt}
                        onDelete={()=>(handleRecipeDelete(recipe.id))}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default FavoriteRecipes