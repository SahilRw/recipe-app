import React from 'react'
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';

const Veggie = () => {
    const [veggie, setVeggie] = useState([]) // 'veggie' is the variable here and setveggie is kind of a function with which you can make modifications in the variable('veggie' in this case)
    // in this case useState([array]) is used coz the api returns an array, it can be a string

    useEffect(() => {   // updates the DOM and fetches Data
        getVeggie();   // this function runs everytime the page is rendered courtesy useEffect
    }, [])

    const getVeggie = async () => {

        const check = localStorage.getItem('veggie');
        if (check) {
            setVeggie(JSON.parse(check))
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=vegetarian`) // the number variable is used to return given number of items
            const data = await api.json();
            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data.recipes)
            console.log(data)
        }
    }
    return (
        <section className="my-16 mx-0">
            <h3>Veggie Food</h3>
            <Splide options={{
                perPage: 3,
                drag: "free",
                gap: '0.8rem',
            }}>
                {veggie.map(recipe => { // loops over the array returned from the api and showcases the returned value on screen(in this case recipe.title)
                    return ( // you need to add a key prop(unique identifier often id is used) to prevent getting an error
                        <SplideSlide key={recipe.id}>
                            <div className='min-h-25rem rounded-3xl overflow-hidden relative' key={recipe.id}>
                                <p className="absolute left-1/2 bottom-0 z-10 w-full h-2/5
                                             text-white transfrom translate-x-[-50%] translate-y-0
                                             flex justify-center items-center text-center
                                             font-semibold text-xs">{recipe.title}
                                </p>
                                {/* border here */}
                                <div className="bg-grey-900">
                                    <img src={recipe.image} alt={recipe.title} className="rounded-3xl absolute left-0 w-full h-full object-cover" />
                                </div>
                            </div>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </section>
    )
}

export default Veggie
