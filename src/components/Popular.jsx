import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
// import "@splidejs/splide/dist/css/splide.min.css"

const Popular = () => {

    const [popular, setPopular] = useState([]) // 'popular' is the variable here and setPopular is kind of a function with which you can make modifications in the variable('popular' in this case)
    // in this case useState([array]) is used coz the api returns an array, it can be a string

    useEffect(() => {   // updates the DOM and fetches Data
        getPopular();   // this function runs everytime the page is rendered courtesy useEffect
    }, [])

    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`) // the number variable is used to return given number of items
        const data = await api.json();
        setPopular(data.recipes) // recipes here is the name of the variable of the array pulled from spoonacularapi
        console.log(data)
    } // used for fetching the data from apis, almost same syntax used almost everytime
    return (
        <section className="my-16 mx-0">
            <h3>Top Rated</h3>
            <Splide options={{
                perPage: 3,
                gap: '2rem',
                drag: "free",
            }}>
                {popular.map(recipe => { // loops over the array returned from the api and showcases the returned value on screen(in this case recipe.title)
                    return ( // you need to add a key prop(unique identifier often id is used) to prevent getting an error
                        <SplideSlide>
                            <div className='min-h-25rem rounded-3xl overflow-hidden relative' key={recipe.id}>
                                <p className="absolute left-1/2 bottom-0 z-10 w-full h-2/5
                                             text-white transfrom translate-x-[-50%] translate-y-0
                                             flex justify-center items-center text-center
                                             font-semibold text-xs">{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} className="rounded-3xl absolute left-0 w-full h-full object-cover" />
                            </div>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </section>
    )
}

export default Popular
