import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Wrapper } from "./components/App.style";
import { StyledButton } from "./components/App.style";
import { getProducts } from "./react-query/ReactQueryApi";
import Item from "./components/item/Item";
import Cart from "./components/Cart/Cart";
import { Header } from "./components/App.style";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, items) => ack + items.amount, 0);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount == 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  if (isLoading) return <LinearProgress />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      <Header>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCart />
          </Badge>
        </StyledButton>
      </Header>
      <Wrapper>
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </>
  );
};

export default App;
