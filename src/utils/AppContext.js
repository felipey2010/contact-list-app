import { useState, createContext, useEffect } from "react";
import api from "./api";
import { useSnackbar } from "notistack";

export const AppDetails = createContext();

const AppContext = ({ children }) => {
  //Global Variables
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonText, setButtonText] = useState("Add");
  const [id, setID] = useState("");
  const [activateClear, setActivateClear] = useState(false);

  //Notification
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //Function to Add Contact
  async function AddContact() {
    const data = {
      name: name,
      phone: phoneNumber,
    };

    if (name !== "" && phoneNumber !== "") {
      if (buttonText === "Add") {
        await api
          .post("/contacts", data)
          .then(() => {
            getContacts();
            setPhoneNumber("");
            setName("");
            showNotification("Contact added", "success");
          })
          .catch(error => {
            console.log(error);
            showNotification("Unable to add contact", "error");
          });
      } else if (buttonText === "Update") {
        await api
          .put("/contacts/" + id, data)
          .then(() => {
            setButtonText("Add");
            getContacts();
            setPhoneNumber("");
            setName("");
            showNotification("Contact updated", "success");
          })
          .catch(error => {
            console.log(error);
            showNotification("Unable to update contact", "error");
          });
      }
    } else {
      showNotification("Please fill all camps", "warning");
    }
  }

  //function to show Notification
  function showNotification(msg, type) {
    closeSnackbar();
    enqueueSnackbar(msg, { variant: type });
    //Clear notification after 2 seconds
    const timeoutId = setTimeout(() => {
      closeSnackbar();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }

  //Delete function
  async function handleDelete(id) {
    closeSnackbar();
    await api
      .delete("/contacts/" + id)
      .then(() => {
        showNotification("Contact deleted", "success");
        getContacts();
      })
      .catch(error => {
        console.log(error);
        showNotification("Failed to delete contact", "error");
      });
  }

  //Edit function
  function handleEdit(name, phone, id) {
    setButtonText("Update");
    setID(id);
    setName(name);
    setPhoneNumber(phone);
    setActivateClear(true);
  }

  async function getContacts() {
    await api
      .get("/contacts")
      .then(res => {
        setContacts(res.data);
      })
      .catch(error => {
        console.log(error);
        setContacts([]);
      })
      .then(() => {
        setLoading(false);
      });
  }

  function clearInput() {
    setName("");
    setPhoneNumber("");
    setID("");
    setButtonText("Add");
    setActivateClear(false);
  }

  useEffect(() => {
    setLoading(true);
    getContacts();
  }, []);

  return (
    <AppDetails.Provider
      value={{
        contacts,
        setContacts,
        loading,
        setLoading,
        getContacts,
        name,
        setName,
        phoneNumber,
        setPhoneNumber,
        buttonText,
        setButtonText,
        AddContact,
        handleDelete,
        handleEdit,
        id,
        setID,
        clearInput,
        activateClear,
      }}>
      {children}
    </AppDetails.Provider>
  );
};

export default AppContext;
