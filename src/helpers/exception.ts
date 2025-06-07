
export default class NotFoundError extends Error {
    constructor(message?:string ){
       super(message);
       Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    errorMessage(){
        return this.message;
    }
}

export class CustomGhippNotFoundError extends Error {
   constructor(message?:string ){
      super(message);
      Object.setPrototypeOf(this, CustomGhippNotFoundError.prototype);
   }
   errorMessage(){
       return this.message;
   }
}

export class CutomTransactionNotFoundError extends Error {
   constructor(message?:string ){
      super(message);
      Object.setPrototypeOf(this, CutomTransactionNotFoundError.prototype);
   }
   errorMessage(){
       return this.message;
   }
}


export  class CustomGhippAccountInactiveError extends Error {
   constructor(message?:string ){
      super(message);
      Object.setPrototypeOf(this, CustomGhippAccountInactiveError.prototype);
   }
   errorMessage(){
       return this.message;
   }
}


export  class CustomGhippAccountOnHoldError extends Error {
   constructor(message?:string ){
      super(message);
      Object.setPrototypeOf(this, CustomGhippAccountOnHoldError.prototype);
   }
   errorMessage(){
       return this.message;
   }
}
export  class CustomValidationError extends Error {
   constructor(message?:string ){
      super(message);
      Object.setPrototypeOf(this, CustomValidationError.prototype);
   }
   errorMessage(){
       return this.message;
   }
}

export  class CustomReverseTransactionError extends Error {
   constructor(message?:string ){
      super(message);
      Object.setPrototypeOf(this, CustomReverseTransactionError.prototype);
   }
   errorMessage(){
       return this.message;
   }
}

export  class CustomError extends Error {
   constructor(message?:string ){
      super(message);
      Object.setPrototypeOf(this, CustomError.prototype);
   }
   errorMessage(){
       return this.message;
   }
}

export  class BadExceptionError extends Error {
   constructor(message?:string ){
      super(message);
      Object.setPrototypeOf(this, CustomError.prototype);
   }
   errorMessage(){
       return this.message;
   }
}

class DatabaseError extends Error {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, DatabaseError.prototype);
   }
}
export class ForeignKeyConstraint extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, ForeignKeyConstraint.prototype);
   }
}

export class UniqueConstraint extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, UniqueConstraint.prototype);
   }
}
export class ExclusionConstraint extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, ForeignKeyConstraint.prototype);
   }
}

export class Timeout extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this,Timeout.prototype);
   }
}

export  class UnknownConstraint extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, UnknownConstraint.prototype);
   }
}
export class Aggregate extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, Aggregate.prototype);
   }
}

export  class AssociationErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, AssociationErr.prototype);
   }
}

export class BulkRecordErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, BulkRecordErr.prototype);
   }
}
export  class AccessDeniedErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, AccessDeniedErr.prototype);
   }
}

export class ConnectionAcquireTimeoutErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, ConnectionAcquireTimeoutErr.prototype);
   }
}

export class ConnectionRefusedErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, ConnectionRefusedErr.prototype);
   }
}
export class ConnectionErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, ConnectionErr.prototype);
   }
}

export class ConnectionTimedOutError extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, ConnectionTimedOutError.prototype);
   }
}
export class EagerLoadingErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, EagerLoadingErr.prototype);
   }
}
export class OptimisticLockErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, OptimisticLockErr.prototype);
   }
}
export class QueryErr extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, QueryErr.prototype);
   }
}
export class SequelizeScopeError extends DatabaseError {
   constructor(message: string) {
       super(message);
       Object.setPrototypeOf(this, SequelizeScopeError.prototype);
   }
}