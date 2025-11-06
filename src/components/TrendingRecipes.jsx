'use client';

import useEmblaCarousel from 'embla-carousel-react';
import {useCallback} from 'react';
import RecipeCard from './RecipeCard';
import Autoplay from 'embla-carousel-autoplay'

const recipes = [
    {
        id: 1,
        title: "Zesty Lemon Pasta",
        description: "A quick, zesty pasta dish perfect for a weeknight dinner.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUIG7wnORbtEDlbpQLdIWTHbmyx2o_us7cjT3kRLlU0V-odQM59uMQeA4uEzBFzskYPxYDK8IYMGgqP_8q0AmisIKIIyG1oyesNv7jw5t7Kzv2t-A1ftfwygKB5bxXvZxquba2vqH4x-zXfizCQzuExg499VRRyKoF6PAl6P-dM4LwgUNv9OocDtBBBPTlPTV_Fn1UfPisImDss_R09F9vP_uzhN-G9QzBKrIVst8Nh1i_dAYsGFue7cUgzJFh0oJDopEu1HT7MQ",
        imageAlt: "A vibrant plate of zesty lemon pasta garnished with fresh parsley."
    },
    {
        id: 2,
        title: "Hearty Beef Stew",
        description: "A slow-cooked classic, rich in flavor and perfect for a cold day.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNZkXIyyNKnaQt0kh2ijToGnsBOfKm30dStAKjISEPk0q7zFQMSd4Wtg0sbRL16jJcyISUnuKPczPAWZm2y179_THubdL49DsqL3rjsj7edPcr9uhR8v7mAT-r7qOeFPCMzyfomzBD_XEjh11Y4uuO4Lw6qBYhAqMgf7cMPOG_ZX6AZEiRirAYwFuE79HahZOrhCl9635oti62mV73QUwep3z3uot1SDcqz3rQhD6FMKmOsS_o7-1pIaVbB9mdhzbiI2OwdXmxjw",
        imageAlt: "A hearty bowl of beef stew with carrots and potatoes."
    },
    {
        id: 3,
        title: "Summer Berry Salad",
        description: "A light and refreshing salad with mixed greens and seasonal berries.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5nCwXqlG-Rm8Dl-bLbzCy8TjVLaWKmThF2OYjHEBI4Vg-a3rnm8HBsmbpczJm5G7E-os2iR0CU6Y1PZ9Z6xCqzHB-n_TAHTV5Aeb6DWjbHmAuicjrWliLnvZ8WSD_272XrDB0JSzFeSLqt5a3MNFi2-u9EtblqBePvTY6e3dx_wEb14UODpTFFMT9FCj0ScJUJLevwnDKATA3rGbngECzKY0UQgFTYM2G4oJ7EosD16XzPTnoErscynAGHdxPfQ_tfDTi1eTwPQ",
        imageAlt: "A refreshing summer berry salad with spinach and goat cheese."
    },
    {
        id: 4,
        title: "Classic Chocolate Chip Cookies",
        description: "The ultimate comfort dessert, gooey on the inside and crispy.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8VTl-Man1p_hLUPLJGoNGHYx22vduRSD5UHfh48ROqZaw0bZLWbSKSCwAcr3IbDObeAF0-hRYg39fl68aYCKjIygBxUO30XKbbGVdB3YJjgcrSOAGHl69ifX-4w6NIq-1f4RDkP__XmW9KMhqcM75lJJhVPGPMzyytU9ZrgLXn7RwkmYJdqP8hOdAAx6EFdIgRQVUIqeCzf4YMje_zRgFAA9IZV2UJfdU0jsqSJOwRDfyWeK5smGjJw9h8fvoF5c4MSFMkQ1dIA",
        imageAlt: "Classic chocolate chip cookies stacked on a plate."
    },
    {
        id: 5,
        title: "Sunrise Smoothie",
        description: "A vibrant blend of tropical fruits to kickstart your morning.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQElQdjBf5Yynyk7AZPsWsBI_1SNFkcIYA-jpUrDpkjAMCNJeWmmV5mD4ULvWv5G0dmYKH1LGfBYCnziQLjbXVSHTwoHQX2j6wOs5UX4oiekfMVc8BimAL3AFeKqgPV6kOnPhvNJze_wZ51irVfdpPf0L2m9XyDPXt0qaAQy_gXxZvgl2JRPZGsXxlRdfCGrNI5xoMxrqh7ONvuTHsGNTLnssLK6aAKJDGf-329N3hrvkd7jWjBMF_RUxHAWsoXlhcMwLU2_nSZQ",
        imageAlt: "A vibrant sunrise smoothie in a glass with a straw."
    }
];

export default function TrendingRecipes() {
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
