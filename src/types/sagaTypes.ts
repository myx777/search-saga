import { PayloadAction } from "@reduxjs/toolkit";
import { ItemsType } from "./skillsTypes";

// Тип для действия changeSearchField
export type ChangeSearchFieldAction = PayloadAction<string>;

// Тип для действия searchSkillsRequest
export type SearchSkillsRequestAction = PayloadAction<string>;

// Тип для данных, возвращаемых функцией searchSkills
export type SearchSkillsData = ItemsType;