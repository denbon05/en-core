/**
 * Common language locale interface.
 */
export interface Locale {
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

  intro: {
    tagline: string;
    name: string;
    description: string;
    representation: string;
    action: string;
  };

  lesson: {
    price: {
      trial: string;
    };
  };

  advantage: {
    experience: string;
    students: string;
    approach: string;
  };

  tutor: {
    nice: string;
    hello: string;
    about: string;
    tagline: string;
    audience: string;
  };
}

// export type LocalePath<L> = {
//   [key in keyof L]?: L[key] extends object ? LocalePath<L[key]> : L[key];
// };

// function join<T>(path: LocalePath<T>, sep = '.'): string {
//   return Object.values(path).join(sep);
// }

// type LocalePaths = typeof join;
