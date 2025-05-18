export class BussinessLogicException extends Error {
  type: BussinessError;
  constructor(message: string, type: number) {
    super(message);
    this.name = 'BusinessLogicException';
    this.type = type;
    Object.setPrototypeOf(this, BussinessLogicException.prototype);
  }
}

export enum BussinessError {
  NOT_FOUND,
  PRECONDITION_FAILED,
  BAD_REQUEST,
}
