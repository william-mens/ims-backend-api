import z from "zod/v4";
import {
   CreateProductSchema,
   UpdateProductSchema,
   CreateProductCategorySchema,
   UpdateProductCategorySchema,
 } from "./schema";
 
 export type CreateProductSchema = z.infer<typeof CreateProductSchema>;
 export type UpdateProductSchema = z.infer<typeof UpdateProductSchema>;
 export type CreateProductCategorySchema = z.infer<typeof CreateProductCategorySchema>;
 export type UpdateProductCategorySchema = z.infer<typeof UpdateProductCategorySchema>;





export interface SetupMerchant {
    id?: string,
    name: string,
    alias: string,
    logo: string,
    companyType: string,
    country:string,
    companyRegistrationNumber:string,
    status?: "active"| "inactive"
}

export interface ProductCategory {
id?: string,
merchantId:string
name:string
description: string
}

export interface Product {
    logo: any;
    id:string,
    merchantId:string,
    categories:string[],
    name:string,
    description:string,
    price:string,
    quantity?:number,
    sku:string,
    meta?:JSON
}

export interface GroupedBatchResponse {
   batches: Batches;
   merchants: Merchants;
   createdBy: UserInfo;
   batchAuditLog: {
     id: string;
     batchId: string;
     fromStageId: string| null;
     fromStage: FromStage | null;
     toStageId: string| null;
     toStage:ToStage | null
     movedBy: string;
     notes: string | null;
     issuesDetected: string | null;
     movedAt: string;
   }[];
 }
 export interface GetBatchResponse {
   batches: Batches
   batchAuditLog: BatchAuditLog 
   fromStage: FromStage
   toStage: ToStage
   merchants: Merchants
   userInfo: UserInfo
 }
 
 export interface Batches {
   id: string
   merchantId: string
   batchCode: string | null
   productId: string
   quantity: number
   createdBy: string
   createdAt: Date
 }
 
 export interface BatchAuditLog {
   id: string
   batchId: string
   fromStageId: string |null
   toStageId: string | null
   movedBy: string | null
   notes: any
   issuesDetected: any
   movedAt: string |null
 }
 
 export interface FromStage {
   id: string
   merchantId: string
   name: string
   position: number
   createdAt: string
 }
 
 export interface ToStage {
   id: string
   merchantId: string
   name: string
   position: number
   createdAt: string
 }
 
 export interface Merchants {
   id: string
   name: string
   logo: any
   alias: string
   companyType: string
   country: string
   status: string
   companyRegistrationNumber: string
 }
 
 export interface UserInfo {
   userId: string
   lastName: string
   otherNames: string
   mobile: any
   imageUrl: string
   createdAt: string
 }
 

 
export interface filterProduct {
   productId?:string,
   merchantId?:string,
   categoryId?:string,
   name?: string
}

 export interface workflowStage {
    id?: string,
    name: string,
    position:number
 }

 export interface Batch {
    id: string,
    batchCode?:string,
    productId?: string,
    merchantId: string,
    quantity?:number,
    createdBy?:string
    createdAt?:string
 }

 export interface getBatchAuditLog {
    batchId: string
 }


