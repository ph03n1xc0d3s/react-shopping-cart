import { Button } from "@mui/material";
import { CartItemType } from "../../App";
import { Wrapper } from "./Item.styled";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} style={{padding: '20px'}}/>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button sx={{
        backgroundColor: '#4477CE',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
        textTransform: 'capitalize',
        color: '#fff',
        ":hover":{
          backgroundColor: '#8CABFF',
          color: '#000',
        }
      }} onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
  );
};

export default Item;
