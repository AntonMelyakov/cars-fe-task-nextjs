import { CarModification } from "@/lib/_generated/graphql_sdk";
import { create, createStore } from "zustand";

type ModificationStore = {
    selectedModification: CarModification | undefined,
    setNewModification: (CarModification: CarModification | undefined) => void
}

export const useModificationStore = create<ModificationStore>((set) => ({
    selectedModification: undefined,
    setNewModification: (CarModification) => { set({ selectedModification: CarModification }) }
}))