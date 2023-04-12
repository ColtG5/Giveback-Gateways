import create from "./http-service";

export interface Message {
    id: number;
    name: string;
}

export default create('/message');