// eslint-disable @typescript-eslint/naming-convention
// CSS modules
type CSSModuleClasses = { readonly [key: string]: string };

declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.module.scss' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.module.sass' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.module.less' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.module.styl' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.module.stylus' {
  const classes: CSSModuleClasses;
  export default classes;
}

// CSS
declare module '*.css' {
  const css: string;
  export default css;
}
declare module '*.scss' {
  const css: string;
  export default css;
}
declare module '*.sass' {
  const css: string;
  export default css;
}
declare module '*.less' {
  const css: string;
  export default css;
}
declare module '*.styl' {
  const css: string;
  export default css;
}
declare module '*.stylus' {
  const css: string;
  export default css;
  import type {
    ComponentRenderProxy,
    VNode,
    VNodeChild,
    ComponentPublicInstance,
    FunctionalComponent,
    PropType as VuePropType,
  } from 'vue';

  declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const __APP_INFO__: {
      pkg: {
        name: string;
        version: string;
        dependencies: Recordable<string>;
        devDependencies: Recordable<string>;
      };
      lastBuildTime: string;
    };
    // declare interface Window {
    //   // Global vue app instance
    //   __APP__: App<Element>;
    // }

    // vue
    declare type PropType<T> = VuePropType<T>;
    declare type VueNode = VNodeChild | JSX.Element;

    export type Writable<T> = {
      -readonly [P in keyof T]: T[P];
    };

    declare type Nullable<T> = T | null;
    declare type NonNullable<T> = T extends null | undefined ? never : T;
    declare type Recordable<T = any> = Record<string, T>;
    declare type ReadonlyRecordable<T = any> = {
      readonly [key: string]: T;
    };
    declare type Indexable<T = any> = {
      [key: string]: T;
    };
    declare type DeepPartial<T> = {
      [P in keyof T]?: DeepPartial<T[P]>;
    };
    declare type TimeoutHandle = ReturnType<typeof setTimeout>;
    declare type IntervalHandle = ReturnType<typeof setInterval>;

    declare interface ChangeEvent extends Event {
      target: HTMLInputElement;
    }

    declare interface WheelEvent {
      path?: EventTarget[];
    }
    interface ImportMetaEnv extends ViteEnv {
      __: unknown;
    }

    declare interface ViteEnv {
      VITE_PORT: number;
      VITE_USE_MOCK: boolean;
      VITE_USE_PWA: boolean;
      VITE_PUBLIC_PATH: string;
      VITE_PROXY: [string, string][];
      VITE_GLOB_APP_TITLE: string;
      VITE_GLOB_APP_SHORT_NAME: string;
      VITE_USE_CDN: boolean;
      VITE_DROP_CONSOLE: boolean;
      VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
      VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
      VITE_LEGACY?: boolean;
      VITE_USE_IMAGEMIN: boolean;
      VITE_GENERATE_UI: string;
    }

    declare function parseInt(s: string | number, radix?: number): number;

    declare function parseFloat(string: string | number): number;

    namespace JSX {
      // tslint:disable no-empty-interface
      type Element = VNode;
      // tslint:disable no-empty-interface
      type ElementClass = ComponentRenderProxy;
      interface ElementAttributesProperty {
        $props: any;
      }
      interface IntrinsicElements {
        [elem: string]: any;
      }
      interface IntrinsicAttributes {
        [elem: string]: any;
      }
    }
  }

  declare module 'vue' {
    export type JSXComponent<Props = any> =
      | { new (): ComponentPublicInstance<Props> }
      | FunctionalComponent<Props>;
  }
}

// images
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.ico' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}

// media
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.webm' {
  const src: string;
  export default src;
}
declare module '*.ogg' {
  const src: string;
  export default src;
}
declare module '*.mp3' {
  const src: string;
  export default src;
}
declare module '*.wav' {
  const src: string;
  export default src;
}
declare module '*.flac' {
  const src: string;
  export default src;
}
declare module '*.aac' {
  const src: string;
  export default src;
}

// fonts
declare module '*.woff' {
  const src: string;
  export default src;
}
declare module '*.woff2' {
  const src: string;
  export default src;
}
declare module '*.eot' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const src: string;
  export default src;
}
declare module '*.otf' {
  const src: string;
  export default src;
}

// web worker
declare module '*?worker' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?worker&inline' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?raw' {
  const src: string;
  export default src;
}

declare module '*?url' {
  const src: string;
  export default src;
}
