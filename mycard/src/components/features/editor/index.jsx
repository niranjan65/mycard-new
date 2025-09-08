import { useEffect, useState } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { defaultEditorProps } from "./props";
import { defaultExtensions } from "./extensions";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { EditorBubbleMenu } from "./bubble-menu";
import { ImageResizer } from "./extensions/image-resizer";
import { EditorProps } from "@tiptap/pm/view";
import "./prosemirror.css";
import { Editor as EditorClass, Extensions } from "@tiptap/core";

export default function Editor({
    className = "relative min-h-[800px] w-[700px] max-w-[700px] border-stone-200 bg-white sm:rounded-lg sm:border sm:shadow-md",
    defaultValue = '',
    extensions = [],
    editorProps = {},
    onUpdate = () => { },
    onDebouncedUpdate = () => { },
    debounceDuration = 750,
    storageKey = "mailrun__content",
    disableLocalStorage = false,
}){
    const [content, setContent] = useLocalStorage(storageKey, defaultValue);

    const [hydrated, setHydrated] = useState(false);

    const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
        const json = editor.getJSON();
        onDebouncedUpdate(editor);

        if (!disableLocalStorage) {
            setContent(json);
        }
    }, debounceDuration);

    const editor = useEditor({
        extensions: [...defaultExtensions, ...extensions],
        editorProps: {
            ...defaultEditorProps,
            ...editorProps,
        },
        onUpdate: (e) => {
            onUpdate(e.editor);
            debouncedUpdates(e);
        },
        autofocus: "end",
    });


    // Default: Hydrate the editor with the content from localStorage.
    // If disableLocalStorage is true, hydrate the editor with the defaultValue.
    useEffect(() => {
        if (!editor || hydrated) return;

        const value = disableLocalStorage ? defaultValue : content;

        if (value) {
            editor.commands.setContent(value);
            setHydrated(true);
        }
    }, [editor, defaultValue, content, hydrated, disableLocalStorage]);

    return (
        <div
            onClick={() => {
                editor?.chain().focus().run();
            }}
            className={className}
        >
            {editor && <EditorBubbleMenu editor={editor} />}
            {editor?.isActive("image") && <ImageResizer editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
}