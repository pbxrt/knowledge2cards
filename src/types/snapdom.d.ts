declare module '@zumer/snapdom' {
  export interface SnapdomOptions {
    scale?: number
    backgroundColor?: string
    [key: string]: string | number | boolean | undefined
  }

  export interface DownloadOptions {
    format?: 'png' | 'jpg' | 'jpeg' | 'webp'
    filename?: string
  }

  export interface SnapdomResult {
    toPng(): Promise<HTMLImageElement>
    download(options?: DownloadOptions): Promise<void>
  }

  export function snapdom(element: HTMLElement, options?: SnapdomOptions): Promise<SnapdomResult>
}