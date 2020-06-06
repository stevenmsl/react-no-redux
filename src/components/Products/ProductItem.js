import React from "react";
//import { useContext } from "react";
//import { useDispatch } from 'react-redux';
import { useStore } from "../../hooks-store/store";
import Card from "../UI/Card";
import "./ProductItem.css";
// import { toggleFav } from '../../store/actions/products';
// import { ProductsContext } from "../../context/products-context";

const ProductItem = (props) => {
  // const dispatch = useDispatch();
  //const toggleFav = useContext(ProductsContext).toggleFav;

  console.log("ProductItem Re-rendered");
  // - optimization – reduce the number of re-renderings
  // - just want to change the state but not
  //   interested in re-rendering myself every
  //   time there is a state change
  // - Re-render only when properties
  //   have changed using React.memo
  const dispatch = useStore(false)[1];

  const toggleFavHandler = () => {
    dispatch("TOGGLE_FAV", props.id);
    //toggleFav(props.id);
    //dispatch(toggleFav(props.id));
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
};

export default React.memo(ProductItem);
