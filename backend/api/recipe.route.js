import express from "express"
import RecipeController from "./recipe.controller.js"
const router = express.Router()

router.route("/").get(RecipeController.apiGetRecipes)

router.route("/id/:id").get(RecipeController.apiGetRecipeById)
router.route("/ingredients").get(RecipeController.apiGetIngredients)



router.route("/recipe")
.post(RecipeController.apiAddRecipe)
.put(RecipeController.apiUpdateRecipe)
.delete(RecipeController.apiDeleteRecipe)

export default router