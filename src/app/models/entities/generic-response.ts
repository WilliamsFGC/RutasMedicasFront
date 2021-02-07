import { HttpStatusCode } from "src/app/enums/http-status-code.enum";

export class GenericResponse<T> {
    isSuccessful: boolean;
    message: string;
    result: T | null;
    statusCode: HttpStatusCode;

    constructor(result?: T | null) {
        this.result = result;
    }
}