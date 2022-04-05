import React, { useState, useEffect } from "react";
import RecipeDataServices from "../services/recipe";
import { Link } from "react-router-dom";
import RecipeCard from "./recipeCard"
const RecipeList = props => {

  const [recipes, setRecipes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchIngredients, setSearchIngredients] = useState("");
  const [allIngredients, setAllIngredients] = useState(["Pick Ingredient"]);
  const [pageN, setPageN] = useState(0)
  const [totalNumrecipes, settotalNumrecipes] = useState(0)

  useEffect(() => {
    retriveRecipes();
    retriveIngredients();
  }, [pageN])

  const incPageN = () => {
    setPageN(pageN + 1)
  }
  const lowerPageN = () => {
    setPageN(pageN - 1)
  }

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchIng = e => {
    const searchZip = e.target.value;
    setSearchIngredients(searchZip);
  };

  const retriveRecipes = () => {
    RecipeDataServices.getAll(pageN)
      .then(response => {
        setRecipes(response.data.recipes);
        settotalNumrecipes(response.data.total_results)
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retriveIngredients = () => {
    RecipeDataServices.getIngredients()
      .then(response => {
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
        setRecipes(response.data.recipes);
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
    RecipeDataServices.deleteRecipe(recipeId)
      .then(response => {
        retriveRecipes()
        retriveIngredients()
      })
      .catch(e => {
        console.log(e);
      });
  };

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
            <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
              Search
            </button>
          </div>
          <select onChange={onChangeSearchIng}>
            {allIngredients.map(ingredient => {
              return (
                <option value={ingredient}> {ingredient} </option>
              )
            })}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByIngridient}>
              Search
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        {recipes.map((recipe) => {
          return (
            <RecipeCard data={recipe} deleteFunction={deleteRecipe} />
          );
        })}
      </div>
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            {pageN > 0 ? <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={lowerPageN}> Previous
            </button> : <div></div>}
          </li>
          {pageN > 0 ? <li className="page-item"><a className="page-link" onClick={lowerPageN} href="#">{pageN - 1 + 1}</a></li> : <div></div>}
          <li className="page-item active">
            <a className="page-link" href="#">{pageN + 1} <span className="sr-only"></span></a>
          </li>
          {pageN  < Math.floor((totalNumrecipes + 5) / 8) ? <li className="page-item"><a className="page-link" onClick={incPageN} href="#">{pageN + 1 + 1}</a></li> : <div></div>}
          <li className="page-item">
            {pageN  < Math.floor((totalNumrecipes + 5) / 8) ? <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={incPageN}> Next
            </button> : <div></div>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RecipeList;
