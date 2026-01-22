import React, { useEffect } from "react";

const RoleModal = ({
    isOpen,
    onClose,
    onSave,
    initialValue = "",
    title = "Add New Role",
    isEdit = false,
}) => {
    const [name, setName] = React.useState(initialValue);

    // Reset when modal opens with new initial value
    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(initialValue);
        }
    }, [isOpen, initialValue]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave(name.trim());
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-xl font-semibold mb-5">{title}</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Role Name"
                        className="w-full border rounded-lg px-3 py-2.5 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        autoFocus
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            {isEdit ? "Update" : "Save"}
                        </button>
                    </div>
                </form>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default RoleModal;