export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not Found') {
    super(message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict') {
    super(message);
  }
}
