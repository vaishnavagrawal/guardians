import { object, string, nativeEnum, infer as InferType, number } from 'zod';

const hospitalType = ['PRIVATE', 'PUBLIC'] as const;

enum HosType {
  PUBLIC,
  PRIVATE,
}

const HosTypeEnum = nativeEnum(HosType);

export const columnsConfigSchema = object({
  key: number(),
  Name: string().default(''),
  Address: string().default(''),
  Lat: number(),
  Lng: number(),
  Area: string().default(''),
  // Type : HosTypeEnum.default(HosType.PRIVATE) ,
  Type: string().default('PRIVATE'),
});

export type ColumnsConfig = InferType<typeof columnsConfigSchema>;
