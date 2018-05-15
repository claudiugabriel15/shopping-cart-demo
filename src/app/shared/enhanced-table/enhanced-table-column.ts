export interface EnhancedTableColumn {
  name: string;
  displayName: string;
  width: number;
  sort?: boolean;
  editable?: boolean;
  expression?: {};
  currency?: string;
}
