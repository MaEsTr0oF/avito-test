declare module 'react-csv' {
  import { Component, ReactNode } from 'react';

  export interface CSVLinkProps {
    data: any[];
    headers?: any[];
    filename?: string;
    className?: string;
    target?: string;
    separator?: string;
    enclosingCharacter?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>, done: (proceed: boolean) => void) => void;
    children?: ReactNode;
  }

  export class CSVLink extends Component<CSVLinkProps> {}
}

