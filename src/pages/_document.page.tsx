import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

export default class MyDocument extends Document<{}> {
  static getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);
    // _document is only rendered on the server side.
    return {
      ...initialProps,
    };
  };
  render() {
    return (
      <Html>
        <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=optional"
          rel="stylesheet"
        />
        </Head>
        <body className="bg-bw-back antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
