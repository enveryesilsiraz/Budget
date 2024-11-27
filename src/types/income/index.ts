export type Entry = {
    id: string;
    type: "income" | "expense";
    amount: string;
    description: string;
    date: string;
    category: string;
  };

  export type IncomeTableColumn = {
    name : string;
    uid : string
  }
  ;
  export type IncomeEntry = Omit<Entry, "type"> & { type: "income" };
