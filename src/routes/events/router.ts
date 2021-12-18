import express from "express";
import requiresAdmin from "../../middleware/validation/requireAdmin";
import requiresUser from "../../middleware/validation/requiresUser";
import {
  eventValidationRules,
  validate,
} from "../../middleware/validation/validator";

import {
    createEventHandler,
    getEventHandler,
    getAllEventsHandler,
    deleteEventHandler,
    updateEventHandler,
    subscribeEventHandler,
    approveEventHandler,
    denyEventRequestHandler,
    
} from "../../controller/events.controller"


const EventRouter = express.Router();
//authorize routes
EventRouter.use(requiresUser);
//create an event
EventRouter.post("/create", eventValidationRules(), validate, createEventHandler)
//get all event (admin only)
EventRouter.get("/get", getAllEventsHandler)
//get a specific event
EventRouter.get("/get/:id", getEventHandler)
//update a specific event
EventRouter.put("/update", eventValidationRules(), validate, updateEventHandler)
//approve a request to join a event
EventRouter.post("/approve", approveEventHandler)
//deny a request to join a event
EventRouter.post("/deny", denyEventRequestHandler)
//subscribe to attend an event
EventRouter.post("/subscribe", subscribeEventHandler)
//delete an event (admin and event owner)
EventRouter.delete("/:id", deleteEventHandler)


export default EventRouter;