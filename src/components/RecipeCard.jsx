export default function RecipeCard({ title, description, imageUrl, imageAlt }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white dark:bg-charcoal/50 shadow-sm min-w-72 flex-shrink-0">
      <div
        className="w-full bg-center bg-no-repeat h-60 bg-cover rounded-t-lg"
        style={{backgroundImage: `url("${imageUrl}")`}}
        role="img"
        aria-label={imageAlt}
      />
      <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
        <div>
          <p className="text-charcoal dark:text-white text-base font-semibold leading-normal">
            {title}
          </p>
          <p className="text-medium-gray dark:text-gray-400 text-sm font-normal leading-normal">
            {description}
          </p>
        </div>
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-white/10 text-charcoal dark:text-white text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-white/20">
          <span className="truncate">View Recipe</span>
        </button>
      </div>
    </div>
  );
}
