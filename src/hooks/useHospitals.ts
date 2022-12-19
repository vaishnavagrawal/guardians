import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import { ColumnsConfig } from "../schemas/column";
import axios from 'axios'

export function useHospitals() {
    return useQuery({
      queryKey: ["posts"],
      queryFn: async (): Promise<Array<ColumnsConfig>> => {
        const { data } = await axios.get(
          "http://localhost:5001/hospitals"
        );
        return data;
      },
    });
  }
  