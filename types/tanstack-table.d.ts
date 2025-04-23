/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { OnChangeFn, RowData, Updater } from "@tanstack/react-table";

export type DensityState = "sm" | "md" | "lg";
export interface DensityTableState {
  density: DensityState;
}

export interface LoadingErrorState {
  isLoading: boolean;
  error?: string | null;
}

export interface DensityOptions {
  enableDensity?: boolean;
  onDensityChange?: OnChangeFn<DensityState>;
}

export interface LoadingErrorOptions {
  onLoadingChange?: OnChangeFn<boolean>;
  onErrorChange?: OnChangeFn<string | null>;
}

export interface DensityInstance {
  setDensity: (updater: Updater<DensityState>) => void;
  toggleDensity: (value?: DensityState) => void;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    displayColumnName?: string;
    className?: string;
  }

  interface TableState extends DensityTableState, LoadingErrorState {}
  interface TableOptionsResolved<T extends RowData>
    extends DensityOptions,
      LoadingErrorOptions {}

  interface Table<T extends RowData> extends DensityInstance {}
}
