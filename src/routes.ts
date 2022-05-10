import express, { Router } from "express";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";

export const routes = (router: Router) => {
    // user routes
    router.get('/api/v1/users', Users)
    router.get("/api/v1/users/:id", GetUser)
    router.post('/api/v1/users', CreateUser)
    router.put("/api/v1/users/:id", UpdateUser)
    router.delete("/api/v1/users/:id", DeleteUser)

}