import { Button } from "@mui/material";
import { CartItemType } from "../../App";
import { Wrapper } from "./Item.styled";

type Props = {
  item: CartItemType,
  handleAddToCart: (clickedItem: CartItemType) => void;
}