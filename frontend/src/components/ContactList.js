const API_URL=process.env.REACT_APP_API_URL;

function ContactList({contacts,onDelete}){

    const deleteContact=async id=>{
        await fetch(`${API_URL}/api/contacts/${id}`,{
            method:"DELETE"
        });
        onDelete();
    };

    if(contacts.length===0){
        return <p>No contacts found</p>;
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map(c=>(
                    <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>
                            <button onClick={()=>deleteContact(c._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ContactList;
