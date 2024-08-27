import { useState, createContext, useEffect, useContext } from 'react'
import { useSnackbar } from 'notistack'

export const AppContext = createContext()

export default function AppProvider({ children }) {
  //Global Variables
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [activateClear, setActivateClear] = useState(false)

  //Notification
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  //function to show Notification
  function showNotification(msg, type) {
    closeSnackbar()
    enqueueSnackbar(msg, { variant: type })
    //Clear notification after 2 seconds
    const timeoutId = setTimeout(() => {
      closeSnackbar()
    }, 2000)
    return () => clearTimeout(timeoutId)
  }

  function setLocalStorage(updatedContacts) {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))
  }

  //Function to Add Contact
  function addContact(data) {
    let updatedContacts
    if (selectedContact) {
      // Update selected contact by id
      updatedContacts = contacts.map((contact) =>
        contact.id === selectedContact.id ? { ...contact, ...data } : contact
      )
      showNotification('Contact updated', 'success')
    } else {
      // Add new contact
      const newContact = {
        ...data,
        id: contacts.length + 1,
      }
      updatedContacts = [...contacts, newContact]
      showNotification('Contact added', 'success')
    }

    setContacts(updatedContacts)
    setLocalStorage(updatedContacts)
    clearInput()
    setSelectedContact(null) // Clear selected contact after adding/updating
  }

  //Delete function
  function handleDelete(contact) {
    closeSnackbar()
    const updatedContacts = contacts.filter((item) => item.id !== contact.id)
    setContacts(updatedContacts)
    setLocalStorage(updatedContacts)
    showNotification('Contact deleted', 'success')
    clearInput()
  }

  function clearInput() {
    setActivateClear(true)
    setTimeout(() => setActivateClear(false), 100)
  }

  // Load contacts from localStorage when the component mounts
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || []
    setContacts(storedContacts)
  }, [])

  return (
    <AppContext.Provider
      value={{
        contacts,
        setContacts,
        addContact,
        handleDelete,
        activateClear,
        setActivateClear,
        setSelectedContact,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
