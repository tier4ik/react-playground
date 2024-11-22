import { forwardRef } from "react";

const DragAndDropField = forwardRef(({children}: {children: React.ReactNode}, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
            <div className="drag-and-drop__field" ref={ref}>
                {children}
            </div>
        )
})

export default DragAndDropField;