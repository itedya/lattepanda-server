import {Request} from "@/interfaces/request";
import {NextFunction, Response} from "express";

class FormRequest {
    protected req: Request;
    protected res: Response;
    protected next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    /**
     * Validate if user is allowed to do a request
     *
     * @returns {boolean}
     */
    public async isAllowed(): Promise<boolean> {
        return true;
    }

    /**
     * Validate if user provided valid data for request
     *
     * @returns {boolean}
     */
    public async validate(): Promise<boolean> {
        this.req.validated = {};

        return true;
    }

}

export default FormRequest;
