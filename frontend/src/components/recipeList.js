import React, { useState, useEffect } from "react";
import RecipeDataServices from "../services/recipe";
import { Link } from "react-router-dom";

const RecipeList = props => {

  const [recipes, setRecipes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchIngredients, setSearchIngredients] = useState("");
  const [allIngredients, setAllIngredients] = useState(["Pick Ingredient"]);

  useEffect(() => {
    retriveRecipes();
    retriveIngredients();
  }, [])

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchIng = e => {
    const searchZip = e.target.value;
    setSearchIngredients(searchZip);
  };





  const retriveRecipes = () => {
    RecipeDataServices.getAll()
      .then(response => {
        console.log(response.data);
        setRecipes(response.data.recipes); // mozda ne radi?

      })
      .catch(e => {
        console.log(e);
      });
  };

  const retriveIngredients = () => {
    RecipeDataServices.getIngredients()
      .then(response => {
        console.log(response.data);
        setAllIngredients(["Pick Ingredient"].concat(response.data));

      })
      .catch(e => {
        console.log(e);
      });
  };


  const refreshList = () => {
    retriveRecipes();
  };

  const find = (query, by) => {
    RecipeDataServices.find(query, by)
      .then(response => {
        console.log(response.data);
        setRecipes(response.data.recipes); // ????
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };


  const findByIngridient = () => {
    if (searchIngredients === "Pick Ingredient") {
      refreshList();
    } else {
      find(searchIngredients, "ingredients")
    }
  };

  

  const deleteRecipe = (recipeId) => {
    console.log("!!!!!!!!!!!!!!!!!");

    console.log(recipeId);
    RecipeDataServices.deleteRecipe(recipeId)
      .then(response => {
        retriveRecipes()
        retriveIngredients()
      })
      .catch(e => {
        console.log(e);
      });
  };


  // const deleteRecipe = (recipeId, index) => {
  //   RecipeDataServices.deleteRecipe(recipeId)
  //     .then(response => {
  //       setRecipes((prevState) => {
  //         prevState.reviews.splice(index, 1)
  //         return ({
  //           ...prevState
  //         })
  //       })
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  return (
    <div>
      <div className="row">
        <div className="input-group col-lg-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
            size="50"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchIng}>
            {allIngredients.map(ingredient => {
              return (
                <option value={ingredient}> {ingredient} </option>
              )
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByIngridient}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        {recipes.map((recipe, index) => {
          return (
            <div className="col-lg-4 pb-1" key={recipe.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  {recipe.img ?
                  <img src={recipe.img} class="img-fluid rounded-circle" alt="..."></img>
:                  <img src="https://img.freepik.com/free-vector/meatball-food-cartoon-your-business_98143-42.jpg" class="img-fluid rounded-circle" alt="..."></img>}
                  <p className="card-text">
                    {/*<strong>Description: </strong>{recipe.description}<br />*/}
                    <strong>Ingredients: </strong>{recipe.ingredients.join(", ")}
                  </p>
                  <div className="row">
                    <Link to={"/recipe/" + recipe._id} className="btn btn-outline-secondary col-lg-5 mx-1 mb-1">
                      Show details
                    </Link>
                    <a onClick={() => deleteRecipe(recipe._id)} className="btn btn-danger col-lg-5 mx-1 mb-1">Delete</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default RecipeList;
