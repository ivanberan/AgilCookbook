
import React, { useState } from "react";
import RecipeDataServices from "../services/recipe";
import { Link } from "react-router-dom";

const AddRecipe = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [img, setImg] = useState("");


  const handleInputName = event => {
    setName(event.target.value);
  };

  const handleInputDescription = event => {
    setDescription(event.target.value);
  };

  const handleInputIngredients = event => {
    let ingredients = event.target.value;
    setIngredients(ingredients);
  };

const handleSetImg = event => {
    setImg(event.target.value);
  };

  const refreshForm = () =>{
    setName("")
    setDescription("")
    setIngredients([])
    setImg("")
  }

  const saveRecipe = () => {
    var data = {
      name: name,
      description:description,
      ingredients: ingredients.split(","),
      img: img
    };
    RecipeDataServices.addRecipe(data)
    .then(response => {
      refreshForm()
    })
    .catch(e => {
      console.log(e);
    });
  }

  return (
    <div>
      <div>
        <div className="form-group">
          <label htmlFor="name">Recipe name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            required
            onChange={handleInputName}
            name="text"
          />
          <br />
          <label htmlFor="description"> Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            required
            onChange={handleInputDescription}
            name="text"
          />
          <br />
          <label htmlFor="ingredients"> Ingredients</label>
          <input
            type="text"
            className="form-control"
            id="ingredients"
            value={ingredients}
            required
            onChange={handleInputIngredients}
            name="text"
          />
          <label htmlFor="ingredients"> Image </label>
          <input
            type="text"
            className="form-control"
            id="Image"
            value={img}
            required
            onChange={handleSetImg}
            name="text"
          />
        </div>
        <button onClick={saveRecipe} className="btn btn-success">
          Add recipe
        </button>
      </div>
    </div>
  );
};

export default AddRecipe;