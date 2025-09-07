export interface Style {
  id: string;
  name: string;
  icon: JSX.Element;
  promptModifier: string;
}

export interface BlueprintViews {
  front: string | null;
  right: string | null;
  left: string | null;
  top: string | null;
  back: string | null;
}
