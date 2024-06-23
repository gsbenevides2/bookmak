declare module "express-minify-html-2" {
  import { type RequestHandler } from "express";

  interface MinifyHTMLOptions {
    override?: boolean;
    exception_url?: boolean;
    htmlMinifier?: {
      removeComments?: boolean;
      collapseWhitespace?: boolean;
      collapseBooleanAttributes?: boolean;
      removeAttributeQuotes?: boolean;
      removeEmptyAttributes?: boolean;
      minifyJS?: boolean;
    };
  }

  function minifyHTML(options: MinifyHTMLOptions): RequestHandler;

  export = minifyHTML;
}
