import { Router } from "express"

import { authenticate } from "@medusajs/medusa"

export default () => {
    const router = Router()

    router.get("/hello", authenticate(), (req, res) => {

        res.json({
            message: "Welcome to Your Store!",
        })
    })

    router.get("/register/getToken", async (req, res) => {

        const registerService = req.scope.resolve("registerService");

        const token = await registerService.getToken();

        res.json({ token });
    })

    router.get("/register/customer", async (req, res) => {

        const registerService = req.scope.resolve("registerService");

        const customer = await registerService.create();

        res.json({ customer });
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

    router.post("/additem", async (req, res) => {

        const postService = req.scope.resolve("postService");
        console.log(req);
        //const { name, img, type } = req.body;
        try {
            const newItem = await postService.createItem( { name:"nnn", img:"öööö", type:"ööö" });

            res.status(201).json({
                message: "Item successfully created",
                data: newItem,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating item",
                error: error.message,
            });
        }
    });

    return router
}