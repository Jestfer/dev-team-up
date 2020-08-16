import Document, { Head, Main, NextScript, Html } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  // As part of build, semantic built with Gulp under /static/semantic
  // Landing page will request semantic.min.css, then it will be in the rest

  // Applied to every page from now on
  // TODO: move Head...
  render() {
    return (
      <Html>
        <Head>
          {/* <link href="/static/semantic/dist/semantic.min.css" rel="stylesheet" /> */}
          <title>Dev Team Up</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
