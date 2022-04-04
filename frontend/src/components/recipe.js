import React, { useState, useEffect } from "react";
import RecipeDataServices from "../services/recipe";
import { Link } from "react-router-dom";

const Recipe = props => {
  const recipeState = {
    id: null,
    name: "",
    description: "",
    ingredients: []
  };

  const [recipeId, setRecipeId] = useState(window.location.href.substring(window.location.href.lastIndexOf("/") + 1))
  const [recipe, setRecipe] = useState(recipeState);
  const [editFlag, setEditFlag] = useState(false)
  ///


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);

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
  const refreshForm = () => {
    setName("")
    setDescription("")
    setIngredients([])
  }

  const updateRecipe = () => {

    var data = {
      id: recipeId,
      name: name,
      description: description,
      ingredients: ingredients
    };

    RecipeDataServices.updateRecipe(data)
      .then(response => {
        changeEditFlag()
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });


  }


  ////



  const changeEditFlag = () => {
    setEditFlag(!editFlag)
  }

  const getRecipe = id => {
    RecipeDataServices.get(id)
      .then(response => {
        setRecipe(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getRecipe(recipeId);
  }, [recipeId]);

  useEffect(() => {
    setName(recipe.name)
    setDescription(recipe.description)
    setIngredients(recipe.ingredients)
    getRecipe(recipeId);
  }, [editFlag]);
 

  return (
    <div>
      {editFlag ?
        (<div>
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
            <label htmlFor="name">Description</label>

            <input
              type="text"
              className="form-control "
              id="description"
              value={description}
              required
              onChange={handleInputDescription}
              name="text"
            />
            <br />
            <label htmlFor="name">Ingredients</label>

            <input
              type="text"
              className="form-control"
              id="ingredients"
              value={ingredients}
              required
              onChange={handleInputIngredients}
              name="text"
            />
          </div>
          <br/>
          <button onClick={updateRecipe} className="btn btn-success">
            Save
          </button>
          <button onClick={changeEditFlag} className="btn btn-outline-secondary">
            Back
          </button>
        </div>
        ) : <div class="card" >
          <div class="card" >
            <div class="card-body">
              <h5 class="card-title">{recipe.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{recipe.ingredients.join(", ")}</h6>
              <p class="card-text">{recipe.description}</p>
              <button onClick={changeEditFlag} class="btn btn-outline-secondary">Edit </button>
            </div>
          </div>

        </div >}

    </div>
  );
}

export default Recipe;
