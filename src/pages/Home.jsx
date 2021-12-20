import { useContext } from "react";
import { AppDetails } from "../utils/AppContext";
import ContactList from "../components/ContactList";
import { FaFileAlt } from "react-icons/fa";
import { MdClear } from "react-icons/md";

export default function Home() {
  //Access Global variables using useContext
  const {
    loading,
    contacts,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    AddContact,
    buttonText,
    clearInput,
    activateClear,
  } = useContext(AppDetails);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className="home-container">
          <div className="home-top1-container">
            <h2>Contact Manager</h2>
          </div>
          <div className="home-top2-container">
            <div className="top2-inner-container">
              <input
                type="text"
                required
                placeholder="name"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="phone number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
              <div className="buttons-div">
                <button onClick={() => AddContact()}>{buttonText}</button>
                {activateClear && <MdClear onClick={() => clearInput()} />}
              </div>
            </div>
          </div>
          <div className="home-body">
            {contacts.length > 0 ? (
              <>
                {contacts
                  .slice(0)
                  .reverse()
                  .map((item, index) => {
                    return <ContactList contact={item} key={index} />;
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
      )}
    </>
  );
}
