import { Request, Response } from "express";

import { People, IPeople, CustomResponse } from "@/models";
import { successHandler, errorHandler, paginationResponse } from "@/utilities";

class PeopleController {
  constructor() {
    this.getPeople = this.getPeople.bind(this);
    this.getPeopleById = this.getPeopleById.bind(this);
    this.postPeople = this.postPeople.bind(this);
    this.updatePeople = this.updatePeople.bind(this);
    this.deletePeople = this.deletePeople.bind(this);
  }

  public async getPeople(req: Request, res: Response): Promise<CustomResponse | void> {
    try {
      // Query
      const { ref_people, page = 1, limit = 50 } = req.query;

      if (ref_people?.length) {
        const isValidPeople = await People.findOne({ ref_people });
        if (!isValidPeople) {
          return res.status(401).json(errorHandler("Unauthorized", res.statusCode));
        }

        return res.status(200).json(successHandler("OK", { data: [isValidPeople] }, res.statusCode));
      }
      // Pagination
      const { limitPage } = paginationResponse({ page: page as string, per_page: limit as string });
      // Find unique people
      const [totalDocs, people] = await Promise.all([
        People.countDocuments(),
        People.find().limit(limitPage).sort({ createdAt: -1 }),
      ]);

      res.status(200).json(successHandler("OK", { data: people, totalDocs }, res.statusCode));
    } catch (err) {
      res.status(401).json(errorHandler("Unauthorized", res.statusCode));
    }
  }

  public async getPeopleById(req: Request, res: Response): Promise<CustomResponse | void> {
    try {
      // Rarams
      const { id } = req.params;

      const isValidPeople = await People.findById(id);
      if (!isValidPeople) {
        return res.status(401).json(errorHandler("Unauthorized", res.statusCode));
      }

      res.status(200).json(successHandler("OK", { data: isValidPeople }, res.statusCode));
    } catch (err) {
      res.status(401).json(errorHandler("Unauthorized", res.statusCode));
    }
  }

  public async postPeople({ body }: Request, res: Response): Promise<void> {
    const data: IPeople = body;

    try {
      const people = new People(data);
      // save
      await people.save();

      res.status(201).json(successHandler("OK", { data: people }, res.statusCode));
    } catch (err) {
      // Do some with error here
      res.status(401).json(errorHandler("Unauthorized", res.statusCode));
    }
  }

  public async updatePeople(req: Request, res: Response): Promise<void> {
    try {
      // Dome some with success here
      res.status(201).json(successHandler("OK", { data: "PUT" }, res.statusCode));
    } catch (err) {
      // Do some with error here
      res.status(401).json(errorHandler("Unauthorized", res.statusCode));
    }
  }

  public async deletePeople(req: Request, res: Response): Promise<void> {
    try {
      // Dome some with success here
      res.status(201).json(successHandler("OK", { data: "DELETE" }, res.statusCode));
    } catch (err) {
      // Do some with error here
      res.status(401).json(errorHandler("Unauthorized", res.statusCode));
    }
  }
}

export default new PeopleController();
