import {useState} from "react";

const API_URL=process.env.REACT_APP_API_URL;

function ContactForm({onAdd}){
    const [form,setForm]=useState({
        name:"",
        email:"",
        phone:"",
        message:""
    });

    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");

    const handleChange=e=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit=async e=>{
        e.preventDefault();

        if(!form.name||!form.email||!form.phone){
            setError("Required fields missing");
            return;
        }

        const emailRegex=/^\S+@\S+\.\S+$/;
        if(!emailRegex.test(form.email)){
            setError("Invalid email format");
            return;
        }

        setError("");

        await fetch(`${API_URL}/api/contacts`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)
        });

        setSuccess("Contact added successfully");
        setForm({name:"",email:"",phone:"",message:""});
        onAdd();

        setTimeout(()=>setSuccess(""),2000);
    };

    return(
        <form>
            {error&&<p className="error">{error}</p>}
            {success&&<p className="success">{success}</p>}

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
            <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange}/>

            <button onClick={handleSubmit} disabled={!form.name||!form.email||!form.phone}>
                Submit
            </button>
        </form>
    );
}

export default ContactForm;
