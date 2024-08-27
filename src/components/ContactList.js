import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import user from '../images/user.png'

export default function ContactList({ contact, handleDelete, handleEdit }) {
  return (
    <div className="contact-list-container">
      <div className="contact-list-details">
        <div className="contact-list-details-user">
          <img src={user} alt="user" />
          <p>{contact.name}</p>
        </div>
        <div className="contact-list-details-phone">
          <p>{contact.phoneNumber}</p>
        </div>
      </div>
      {/* <div className="space-between"></div> */}
      <div className="contact-list-buttons">
        <div className="contact-list-buttons-divider" />
        <button
          type="button"
          onClick={() => handleEdit(contact)}
          className="action-button"
        >
          <FaPen />
        </button>
        <div className="contact-list-buttons-divider" />
        <button
          type="button"
          onClick={() => handleDelete(contact)}
          className="action-button"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  )
}
