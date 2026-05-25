import { HEADERS, URL_COLUMNS } from "../../Components/Utils/Settings";
import type { Columns } from "../props/type";

const columnsApi = {
  getColumns: async () => {
    const response = await fetch(URL_COLUMNS);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  },

  add: async (columns: Omit<Columns, "id">) => {
    const response = await fetch(URL_COLUMNS, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(columns),
    });

    if (!response.ok) {
      throw new Error(`ADD error: ${response.status}`);
    }

    return await response.json();
  },

  deleteColumn: async (columnId: string) => {
    const response = await fetch(`${URL_COLUMNS}/${columnId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`deleteColumn error: ${response.status}`);
    }

    return await response.json();
  },
};

export default columnsApi;
