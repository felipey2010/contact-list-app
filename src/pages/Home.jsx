import React from 'react'
import { FaFileAlt } from 'react-icons/fa'
import { MdClear } from 'react-icons/md'
import ContactList from '../components/ContactList'
import { useApp } from '../utils/AppContext'
import { useForm } from 'react-hook-form'

export default function Home() {
  //Access Global variables using useContext
  const {
    contacts,
    addContact,
    clearInput,
    activateClear,
    setActivateClear,
    setSelectedContact,
    handleDelete,
  } = useApp()
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  })

  function onSubmit(data) {
    addContact(data)
    reset()
  }

  function handleEdit(contact) {
    setSelectedContact(contact)
    setValue('name', contact.name)
    setValue('phoneNumber', contact.phoneNumber)
    setActivateClear(true)
  }

  return (
    <div className="home-container">
      <div className="home-top1-container">
        <h2>Contact Manager</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="home-top2-container">
        <div className="top2-inner-container">
          <input
            type="text"
            required
            placeholder="name"
            autoFocus
            autoComplete="off"
            {...register('name', { required: true })}
          />
          <input
            type="text"
            required
            placeholder="phone number"
            autoComplete="off"
            {...register('phoneNumber', { required: true })}
          />
          <div className="buttons-div">
            <button type="submit">Add</button>
            {activateClear && <MdClear onClick={() => clearInput()} />}
          </div>
        </div>
      </form>
      <div className="home-body">
        {contacts.length > 0 ? (
          <>
            {contacts
              .slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  <ContactList
                    contact={item}
                    key={index}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                )
              })}
          </>
        ) : (
          <div className="home-body-empty">
            <FaFileAlt />
            <h2>Contact List Empty</h2>
          </div>
        )}
      </div>
    </div>
  )
}
