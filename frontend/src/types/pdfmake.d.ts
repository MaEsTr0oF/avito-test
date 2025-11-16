declare module 'pdfmake/build/pdfmake' {
  interface TDocumentDefinitions {
    content?: unknown;
    styles?: unknown;
    defaultStyle?: unknown;
    pageSize?: unknown;
    pageOrientation?: unknown;
    pageMargins?: unknown;
    header?: unknown;
    footer?: unknown;
    background?: unknown;
    info?: unknown;
    compress?: boolean;
    userPassword?: string;
    ownerPassword?: string;
    permissions?: unknown;
  }

  interface TCreatedPdf {
    download(filename?: string): void;
    open(): void;
    print(): void;
    getBlob(callback: (blob: Blob) => void): void;
    getBase64(callback: (base64: string) => void): void;
    getDataUrl(callback: (dataUrl: string) => void): void;
  }

  interface PdfMakeStatic {
    vfs?: Record<string, string>;
    fonts?: Record<string, Record<string, string>>;
    createPdf(documentDefinitions: TDocumentDefinitions): TCreatedPdf;
  }

  const pdfMake: PdfMakeStatic;
  export default pdfMake;
}

declare module 'pdfmake/build/vfs_fonts' {
  export const pdfMake: {
    vfs: Record<string, string>;
  };
}

