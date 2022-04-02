import recipeDAO from "../dao/recipeDAO.js"

export default class RecipeController {
    static async apiGetRecipes(req, res, next) {
        const recipesPerPage = req.query.recipesPerPage ? parseInt(req.query.recipesPerPage, 10) : 10
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
    }/*
    static async apiGetRestaurantById(req, res, next) {
        try {
            let id = req.params.id || {}
            let restaurant = await RestaurantsDAO.getRestaurantByID(id)
            if (!restaurant) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(restaurant)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetRestaurantCuisines(req, res, next) {
        try {
            let cuisines = await RestaurantsDAO.getCuisines()
            res.json(cuisines)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }*/
}