import { fireEvent } from "../../../../common/dom/fire_event";
import type { LovelaceConfig } from "../../../../data/lovelace/config/types";

export interface EditSectionDialogParams {
  lovelaceConfig: LovelaceConfig;
  saveConfig: (config: LovelaceConfig) => void;
  viewIndex: number;
  sectionIndex: number;
}

const importEditSectionDialog = () => import("./hui-dialog-edit-section");

export const showEditSectionDialog = (
  element: HTMLElement,
  editSectionDialogParams: EditSectionDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "hui-dialog-edit-section",
    dialogImport: importEditSectionDialog,
    dialogParams: editSectionDialogParams,
  });
};
