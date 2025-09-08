import Moveable from "react-moveable";

export const ImageResizer = ({ editor }) => {
    const updateMediaSize = () => {
        const imageInfo = document.querySelector(".ProseMirror-selectednode");
        if (imageInfo) {
            const selection = editor.state.selection;
            editor.commands.setImage({
                src: imageInfo.src,
                width: Number(imageInfo.style.width.replace("px", "")),
                height: Number(imageInfo.style.height.replace("px", "")),
            });
            editor.commands.setNodeSelection(selection.from);
        }
    };

    return (
        <>
            <Moveable
                target={document.querySelector(".ProseMirror-selectednode")}
                container={null}
                origin={false}
                edge={false}
                throttleDrag={0}
                keepRatio={true}
                resizable={true}
                throttleResize={0}
                onResize={({ target, width, height, delta }) => {
                    if (delta[0]) target.style.width = `${width}px`;
                    if (delta[1]) target.style.height = `${height}px`;
                }}
                onResizeEnd={() => {
                    updateMediaSize();
                }}
                scalable={true}
                throttleScale={0}
                renderDirections={["w", "e"]}
                onScale={({ target, transform }) => {
                    target.style.transform = transform;
                }}
            />
        </>
    );
};
