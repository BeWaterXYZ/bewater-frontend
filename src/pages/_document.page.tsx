import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
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
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-bw-back antialiased" data-theme="light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
