export type FormState<T> = {
  errors: { [key: string]: string[] } | null;
  fieldsData: T;
  message?: string | null;
};
