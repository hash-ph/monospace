/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppRoot {
    }
    interface MonoEditor {
        "dimensions": { cols: number; rows: number; };
        "tag": string;
        "text": string;
    }
    interface PopupMenu {
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLMonoEditorElement extends Components.MonoEditor, HTMLStencilElement {
    }
    var HTMLMonoEditorElement: {
        prototype: HTMLMonoEditorElement;
        new (): HTMLMonoEditorElement;
    };
    interface HTMLPopupMenuElement extends Components.PopupMenu, HTMLStencilElement {
    }
    var HTMLPopupMenuElement: {
        prototype: HTMLPopupMenuElement;
        new (): HTMLPopupMenuElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "mono-editor": HTMLMonoEditorElement;
        "popup-menu": HTMLPopupMenuElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface MonoEditor {
        "dimensions"?: { cols: number; rows: number; };
        "onTextUpdated"?: (event: CustomEvent<string>) => void;
        "tag"?: string;
        "text"?: string;
    }
    interface PopupMenu {
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "mono-editor": MonoEditor;
        "popup-menu": PopupMenu;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "mono-editor": LocalJSX.MonoEditor & JSXBase.HTMLAttributes<HTMLMonoEditorElement>;
            "popup-menu": LocalJSX.PopupMenu & JSXBase.HTMLAttributes<HTMLPopupMenuElement>;
        }
    }
}
