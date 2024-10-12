import { Router } from "express"

import { authenticate } from "@medusajs/medusa"

export default () => {
    //const router = Router();

    const express = require('express');
    const router = express.Router();

    // Body-parser middleware
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

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

    //tekil kaydeder
    router.post("/additem", async (req, res) => {

        const postService = req.scope.resolve("postService");
        //console.log(req.body);
        const { name, img, type } = req.body;
        try {
            const newItem = await postService.createItem({ name, img, type });

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

    //array kaydeder
    router.post("/addlist", async (req, res) => {
        const postService = req.scope.resolve("postService");
        const items = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({
                message: "Invalid input, expected an array of items.",
            });
        }

        try {
            const newItems = await postService.manager_.transaction(async (transactionalEntityManager) => {
                return await Promise.all(
                    items.map(async (item) => {
                        const { name, img, type } = item;
                        return await postService.createItemWithTransaction({ name, img, type }, transactionalEntityManager);
                    })
                );
            });

            res.status(201).json({
                message: "Items successfully created",
                data: newItems,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating items",
                error: error.message,
            });
        }
    });

    router.delete("/deleteitem/:id", async (req, res) => {
        const postService = req.scope.resolve("postService");
        const { id } = req.params; // URL'den id'yi al?yoruz

        try {
            const deletedItem = await postService.deleteItem(id); 

            if (!deletedItem) {
                return res.status(404).json({
                    message: "Item not found",
                });
            }

            res.status(200).json({
                message: "Item successfully deleted",
                data: deletedItem,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error deleting item",
                error: error.message,
            });
        }
    });

    return router
}