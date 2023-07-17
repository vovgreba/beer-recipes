import React from 'react';
import useBeerStore from "../../Store/Store";

import { Characteristics } from '../../BasicComponents/BasicComponents';

import s from './BeerRecipe.module.scss'

function BeerRecipe() {
  const { selectedRecipe} = useBeerStore();

  return (
    <>
      {selectedRecipe?.map(el => {
        return (
        <div key={ el.id } className={s.beer}>
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
            <h3 className={s.recommendedFood}>Recommended Food Pairings:</h3>
            <ul>
              {el.food_pairing.map((el, index)=> {
                return <li key={index}>{el}</li>
              })}
            </ul>
          </div>
        </div>
        )
        
      })}

    </>
  );
}

export default BeerRecipe;