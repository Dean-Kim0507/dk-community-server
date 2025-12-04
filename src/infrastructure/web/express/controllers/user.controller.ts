import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { REGISTER_USER_USE_CASE } from "../../../../configuration/dependency-registries/tokens";
import { RegisterUserUseCasePort } from "../../../../application/use-cases/customer/user/register-user/register-user.use-case.port";

@injectable()
class UserController {
    constructor(
        @inject(REGISTER_USER_USE_CASE)
        private readonly registerUserUseCase: RegisterUserUseCasePort
    ) {}

    public async register(req: Request, res: Response): Promise<Response> {
        const { email, username, password } = req.body;

        try {
            const result = await this.registerUserUseCase.execute({ email, username, password });
            
            return res.status(201).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export {UserController}