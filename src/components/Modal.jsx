export default function Modal({isOpen, children}) {

    if (isOpen) {
        return (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md z-1000">
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 bg-white rounded-2xl">
                    {children}
                </div>
            </div>
        );
    }

    return null;
}