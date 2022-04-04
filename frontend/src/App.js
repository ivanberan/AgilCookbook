import React from "react";
import { Switch, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import AddRecipe from "./components/addRecipe";
import RecipeList from "./components/recipeList";
import Recipe from "./components/recipe";

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Cookbook
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/addRecipe"} className="nav-link">
              Add new recipe
            </Link>
          </li>

        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<Recipe />}/>
          {/* <Route path="/recipe/:id" render={(props) => (
            <Recipe {...props}  />
          )} />  */}
        </Routes>
        {/* <Routes>
          <Route path={["/", "/recipes"]} element={<recipeList />} />
          <Route path="/recipe" element={<recipeList />}
          />
          <Route
            path="/recipe/:id"
            render={(props) => (
              <Recipe {...props} />
            )}
          />

        </Routes> */}

      </div>
    </div>
  );
}

export default App;
