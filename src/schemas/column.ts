import { object, string , nativeEnum  , infer as InferType} from "zod";

const hospitalType = ['PRIVATE' , 'PUBLIC'] as const

enum HosType {
    PUBLIC,
    PRIVATE,
  }

const HosTypeEnum = nativeEnum(HosType);
  
export const columnsConfigSchema = object({
    name : string().default('') ,
    address : string().default('') ,
    lat : string().default('') ,
    lan : string().default('') ,
    area : string().default('') ,
    type : HosTypeEnum.default(HosType.PRIVATE) ,

})

export type ColumnsConfig = InferType <typeof columnsConfigSchema>