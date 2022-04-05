import recipeDAO from "../dao/recipeDAO.js"

export default class RecipeController {
    static async apiGetRecipes(req, res, next) {
        const recipesPerPage = req.query.recipesPerPage ? parseInt(req.query.recipesPerPage, 10) : 8
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.ingredients) {
            filters.ingredients = req.query.ingredients
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const { recipeList, totalNumrecipes } = await recipeDAO.getRecipes({
            filters,
            page,
            recipesPerPage,
        })

        let response = {
            recipes: recipeList,
            page: page,
            filters: filters,
            entries_per_page: recipesPerPage,
            total_results: totalNumrecipes,
        }
        res.json(response)
    }


    static async apiAddRecipe(req, res, next) {
        try {
            const name = req.body.name;
            const description = req.body.description;
            const ingredients = req.body.ingredients;
            const img = req.body.img

            const RecipeResponse = await recipeDAO.addRecipe(
                name,
                description,
                ingredients,
                img,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateRecipe(req, res, next) {
        try {
            const _id = req.body.id;
            const name = req.body.name;
            const description = req.body.description;
            const ingredients = req.body.ingredients;

            const RecipeResponse = await recipeDAO.updateRecipe(
                _id,
                name,
                description,
                ingredients,
            )

            var { error } = RecipeResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (RecipeResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update recipe - user may not be original poster",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteRecipe(req, res, next) {
        try {
            const recipeId = req.query.id
            //const recipeId = req.body.id 
            const RecipeResponse = await recipeDAO.deleteRecipe(
                recipeId,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }



    static async apiGetRecipeById(req, res, next) {
        try {
            let id = req.params.id || {}
            let recipe = await recipeDAO.getRecipeById(id)
            if (!recipe) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(recipe)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetIngredients(req, res, next) {
        try {
            let ingredients = await recipeDAO.getIngredients()
            res.json(ingredients)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}