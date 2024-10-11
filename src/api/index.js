import { Router } from "express"

export default () => {
    const router = Router()

    router.get("/hello", (req, res) => {

        res.json({
            message: "Welcome to Your Store!",
        })
    })

    router.get("/get/pokemons", async (req, res) => {

        const postService = req.scope.resolve("postService");

        const product = await postService.getMessage();

        res.json(JSON.parse(product));
    })

    return router
}