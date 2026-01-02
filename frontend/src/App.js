import {useEffect,useState} from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

const API_URL=process.env.REACT_APP_API_URL;

function App(){
    const [contacts,setContacts]=useState([]);
    const [loading,setLoading]=useState(true);

    const fetchContacts=async()=>{
        setLoading(true);
        const res=await fetch(`${API_URL}/api/contacts`);
        const data=await res.json();
        setContacts(data);
        setLoading(false);
    };

    useEffect(()=>{
        fetchContacts();
    },[]);

    return(
        <div className="container">
            <h2>Contact Management App</h2>

            <ContactForm onAdd={fetchContacts}/>

            {loading ? (
                <p>Loading contacts...</p>
            ) : (
                <ContactList contacts={contacts} onDelete={fetchContacts}/>
            )}
        </div>
    );
}

export default App;
