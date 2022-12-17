import axios from 'axios'

export function deleteAccount(navigate, toast) {
  const endpoint = "https://chatterbox-v2-api.vercel.app/delete";
  axios
    .delete(endpoint, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then(({ data }) => {
      if (data.auth == true) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error deleting account",
        });
      }
    })
    .catch((err) =>
      toast.current.show({
        severity: "error",
        summary: "Error deleting account",
      })
    );
}

export async function logout({ navigate }, toast) {
  // Dispatches
  try {
    localStorage.removeItem("token");
    navigate("/login");
  } catch (err) {
    toast.current.show({
      severity: "error",
      summary: "Erorr logging out",
    });
  }
}

export const deleteAccountConfirmation = (event, navigate, toast, func) => {
  confirmPopup({
    target: event.target,
    message: "Are you sure you want to delete this account?",
    icon: "pi pi-exclaimation-mark",
    accept: () => deleteAccount(navigate, toast),
    reject: () => {},
  });
};

export function verifyToken(setState) {
  const Endpoint = "https://chatterbox-v2-api.vercel.app/validate";
  axios.post(
    Endpoint,
    {},
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  )
  .then(({ data }) => {
    setState(data.auth);
  })
  .catch((error) => {
    setState(false);
  });
}