import React from 'react';
import {useState} from 'react';
import { useQuery } from 'react-query';
import Drawer from '@mui/material'
import {LinearProgress} from '@mui/material';
import Grid from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material'
import Badge from '@mui/material';
import { Wrapper } from './components/App.style';
import { getProducts } from './react-query/ReactQueryApi';

export type CartItemType = {
  id : number,
  category : string,
  description: string,
  image: string,
  price : number,
  title: string,
  amount: number
}

const App = () => {

  const getTotalItems = () => null;
  
  const handleAddToCart = () => null;
  
  const handleRemoveFromCart = (clickedItem: CartItemType) => null;

  const { data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);

  if(isLoading) return <LinearProgress />;
  if(error) return <p>Something went wrong...</p>
  
  return (
    <>
    <h1>Hello World</h1>
    </>
  )
}

export default App;
