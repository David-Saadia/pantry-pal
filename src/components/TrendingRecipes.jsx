'use client';

import useEmblaCarousel from 'embla-carousel-react';
import {useCallback} from 'react';
import RecipeCard from './RecipeCard';
import Autoplay from 'embla-carousel-autoplay'


export default function TrendingRecipes({recipes}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        slidesToScroll: 1,
    }, [Autoplay({stopOnMouseEnter:true,stopOnInteraction:false})]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section>
            <h2 className="text-charcoal dark:text-white text-2xl lg:text-3xl font-bold leading-tight tracking-tight px-4 pb-4">
                Our Chef's Trending Recipes
            </h2>
            <div className="relative">
                <div className="overflow-hidden px-4" ref={emblaRef}>
                    <div className="flex gap-6 pb-4">
                        {recipes.map((recipe, index) => (
                            <div key={recipe.id} style={index === recipes.length - 1 ? { marginRight: '1.5em' } : {}}>
                                <RecipeCard
                                    key={recipe.id}
                                    title={recipe.title}
                                    description={recipe.description}
                                    imageUrl={recipe.imageUrl}
                                    imageAlt={recipe.imageAlt}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-charcoal/90 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-charcoal z-10"
                    aria-label="Previous recipes"
                >
                    <span className="material-symbols-outlined text-charcoal dark:text-white">chevron_left</span>
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-charcoal/90 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-charcoal z-10"
                    aria-label="Next recipes"
                >
                    <span className="material-symbols-outlined text-charcoal dark:text-white">chevron_right</span>
                </button>
            </div>
        </section>
    );
}
