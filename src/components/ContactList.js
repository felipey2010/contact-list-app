import { useContext } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import user from "../images/user.png";
import { AppDetails } from "../utils/AppContext";

export default function ContactList({ contact }) {
  const { handleDelete, handleEdit } = useContext(AppDetails);

  return (
    <div className="contact-list-container">
      <div className="contact-list-details">
        <div className="contact-list-details-user">
          <img src={user} alt="user" />
          <p>{contact.name}</p>
        </div>
        <div className="contact-list-details-phone">
          <p>{contact.phone}</p>
        </div>
      </div>
      {/* <div className="space-between"></div> */}
      <div className="contact-list-buttons">
        <div className="contact-list-buttons-divider"></div>
        <FaPen
          onClick={() => handleEdit(contact.name, contact.phone, contact._id)}
        />
        <div className="contact-list-buttons-divider"></div>
        <FaTrash onClick={() => handleDelete(contact._id)} />
      </div>
    </div>
  );
}
