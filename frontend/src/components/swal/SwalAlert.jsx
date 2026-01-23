import Swal from "sweetalert2";

const SuccessAlert = async ({
    title = "Success!",
    text = "Operation completed successfully.",
    confirmButtonColor = "#10b981",
    timer = 1500,
} = {}) => {
    await Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonColor,
        timer,
        timerProgressBar: true,
        showConfirmButton: false,
    });
};


const ErrorAlert = async ({
    title = "Sorry!",
    text = "There was an error.",
    confirmButtonColor = "#ef4444",
} = {}) => {
    await Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonColor,
        confirmButtonText: "Okay",
    });
};

export { SuccessAlert, ErrorAlert };