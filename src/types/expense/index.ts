import { Entry } from "../income/index";
export type ExpenseEntry = Omit<Entry, "type"> & { type: "expense" };