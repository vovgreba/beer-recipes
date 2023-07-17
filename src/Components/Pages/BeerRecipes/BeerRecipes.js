import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import useBeerStore from "../../Store/Store";


import { Button, Characteristics } from '../../BasicComponents/BasicComponents';
import{ ReactComponent as Preloader } from '../../Preloder/loading.svg'
import s from './BeerRecipes.module.scss'


function BeerRecipes() {
  const {recipesBeer, edditRecipes, recipesBeerLength, setSelectedRecipe, handleContextMenu, showButtonIdToDelete, removeRecipeById} = useBeerStore()
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const [countRecipes, setCountRecipes] = useState(5)
  const [pageRecipes, setPageRecipes] = useState(1)
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=> {
    const fetchData = async () => {
      setLoading(true);
      try{
        await edditRecipes(pageRecipes)
        setLoading(false)
      }catch(error) {
        setLoading(false)
        setError(error)
      }
    };
    fetchData();
    
  }, [])

  useEffect(()=> {

    if(inView) {
      setCountRecipes(countRecipes => countRecipes + 5)
    }
    if(recipesBeerLength === countRecipes) {
      
      const fetchData  = async () => {
        const updatedPageRecipes = pageRecipes + 1;
        setPageRecipes(updatedPageRecipes);
        const data = await edditRecipes(updatedPageRecipes)
        return data
      }
      fetchData ()
    }

  }, [inView])


  const firstFiveRecipes = recipesBeer?.slice(0, countRecipes);

  if(loading) {
    return(
      <div className='preloader'>
        <Preloader />
      </div>
    )
  } 

  if(error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.containerBeer}>
      {firstFiveRecipes?.map((el, index) => {
        const name = el.name.replace(/\s/g,'')
        const isLastRecipe = index === firstFiveRecipes.length - 1;
        return (

          <div key={el.id} onContextMenu={(ev) => {
            ev.preventDefault();
            handleContextMenu(el.id)}
          } className={s.wrapper}>
            <Link
            onClick={(ev) => setSelectedRecipe(el)} 
            ref={isLastRecipe ? ref : null} to={`/recipe/${name}/${el.id}`}>
              <div className={s.beer}>
                <img src={el.image_url} alt={el.name}/>
                <div className={s.content}>
                  <h2 className={s.title}>{el.name}</h2>
                  <Characteristics className={s.characteristic}
                  name={'Characteristic: '} desc={el.tagline}
                  />
                  <Characteristics className={s.characteristic}
                  name={'Description: '} desc={el.description}
                  />
                  <Characteristics className={s.characteristic}
                  name={'Alcohol by Volume (ABV): '} desc={`${el.abv}%`}
                  />
                  <Characteristics className={s.characteristic}
                  name={'Color (EBC): '} desc={el.ebc}
                  />
                  <Characteristics className={s.characteristic}
                  name={'Bitterness Level (IBU): '} desc={el.ibu}
                  />
                  <Characteristics className={s.characteristic}
                  name={'First Brewed Date: '} desc={el.first_brewed.replace('/', '.')}
                  />
                </div>
              </div>
            </Link>
          </div>
        )
      })}
      {showButtonIdToDelete && <Button onClick={removeRecipeById} className={s.delete} name='Delete'/>}
    </div>
  );
}

export default BeerRecipes;