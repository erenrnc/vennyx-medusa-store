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

        const limit = parseInt(req.query.limit) || 20;
        const offset = parseInt(req.query.offset) || 0;

        const product = await postService.getMessage(limit, offset);

        res.json(JSON.parse(product));
    })

    router.get("/getby", async (req, res) => {

        const postService = req.scope.resolve("postService");

        const name = req.query.name;

        const product = await postService.getPokeInfo(name);

        res.json(JSON.parse(product));
    })

    return router
}