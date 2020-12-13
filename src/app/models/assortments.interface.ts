export interface Assortment {
  title: {
    am: string;
    en: string;
  };
  description: {
    am: string;
    en: string;
  };
  price: string;
  urls: Array<AssortmentUrl>;

  id?: string;
}

export interface AssortmentUrl {
  main?: boolean;
  url: string;
  name?: {
    am: string;
    en: string;
  };
  price?: string;
}
