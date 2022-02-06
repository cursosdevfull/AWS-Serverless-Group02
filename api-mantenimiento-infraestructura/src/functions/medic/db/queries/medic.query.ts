export const QUERY_MEDIC_LIST =
  "SELECT id, name, lastname, cmp, email from medic";

export const QUERY_MEDIC_LIST_ONE = `
    SELECT id, name, lastname, cmp, email from medic
    WHERE id = :id`;

export const QUERY_INSERT = `
    INSERT INTO medic (name, lastname, cmp, email)
    values (:name, :lastname, :cmp, :email)
`;
