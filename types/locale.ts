/**
 * Common language locale interface.
 */
export interface Locale {
  lang: string; // todo: remove

  menu: {
    about: {
      title: string;
    };
    programs: {
      title: string;
    };
    contact: {
      title: string;
    };
  };
}

// export type LocalePath<L> = {
//   [key in keyof L]?: L[key] extends object ? LocalePath<L[key]> : L[key];
// };

// function join<T>(path: LocalePath<T>, sep = '.'): string {
//   return Object.values(path).join(sep);
// }

// type LocalePaths = typeof join;
