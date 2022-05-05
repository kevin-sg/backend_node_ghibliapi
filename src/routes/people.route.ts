import { Router, IRouter } from "express";
import { check } from "express-validator";

import { validationField } from "@/middlewares";
import { PeopleController } from "@/controllers";

class PeopleRoute {
  public userRoute: IRouter;

  public constructor() {
    this.userRoute = Router();

    this.routeGet();
    this.routeGetById();
    this.routePost();
    this.routePut();
    this.routeDelete();
  }

  // GET /api/people
  private routeGet() {
    this.userRoute.get("/", PeopleController.getPeople);
  }

  // GET /api/people/:id
  private routeGetById() {
    this.userRoute.get("/:id", PeopleController.getPeopleById);
  }

  // POST /api/people
  private routePost() {
    this.userRoute.post(
      "/",
      [
        check("ref_people", "Ref.people is required").notEmpty(),
        check("appearance", "Appearance is required").notEmpty(),
        check("history", "History is required").notEmpty(),
        check("img", "Image is required").notEmpty(),
        validationField,
      ],
      PeopleController.postPeople,
    );
  }

  // PUT /api/people/:id
  private routePut() {
    this.userRoute.post(
      "/:id",
      [
        // validation
      ],
      PeopleController.updatePeople,
    );
  }

  // DELETE /api/people/:id
  private routeDelete() {
    this.userRoute.post(
      "/:id",
      [
        // validation
      ],
      PeopleController.deletePeople,
    );
  }
}

export default new PeopleRoute().userRoute;
