import FormRequest from "@/app/requests/form-request";
import {Request} from "@/interfaces/request";
import {NextFunction, Response} from "express";

const formRequestHandler = (form: typeof FormRequest) => async (req: Request, res: Response, next: NextFunction) => {
    let formRequest: FormRequest = new form(req, res, next);

    if (!await formRequest.isAllowed()) return;
    if (!await formRequest.validate()) return;

    next();
}

export default formRequestHandler;
