import { createSignal, type Component } from "solid-js";
import "./Tile.css";
export type TileColor = "white" | "black";
export interface TileProps {
  pos: string;
  isSelected: boolean;
  color: TileColor;
  onClick: () => void;
}

export const Tile: Component<TileProps> = (props) => {
  const [isSelected, setIsSelected] = createSignal(props.isSelected);

  const handleClick = () => {
    setIsSelected(!isSelected());
  }
  
  return (
    <div classList={{ "tile-white": props.color === "white", "tile-black": props.color === "black" }} onClick={handleClick}>
      
    </div>
  )
}