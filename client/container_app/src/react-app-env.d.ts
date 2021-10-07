/// <reference path="react.d.ts" />

export {};

declare global {
  interface Window {
    documents_app_url?: string;
    kanban_app_url?: string;
  }
}
