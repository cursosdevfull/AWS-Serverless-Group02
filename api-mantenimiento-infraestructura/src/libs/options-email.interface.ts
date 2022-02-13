export interface OptionsEmail {
  source: string;
  addresses: string[];
  subject: string;
  template: {
    nameBucket: string;
    key: string;
  };
  data: { [s: string]: string | number }[];
}
