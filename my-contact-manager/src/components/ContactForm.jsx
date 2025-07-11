import React, {useState} from "react";


function ContactForm(onAddContact) { // cria componente ContactForm
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

    if (!name || !email || !phone) {
        alert("Name, email, and phone are required");
            return;
    }
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            phone
        };
        onAddContact(newContact);
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2>Add Contact</h2>
            <div style = {inputGroupStyle}>
                <label htmlFor = "name" style = {labelStyle}>Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    required
                />
            </div>
            <div style={inputGroupStyle}>
                <label htmlFor="email" style={labelStyle}>Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
            </div>
            <div style={inputGroupStyle}>
                <label htmlFor="phone" style={labelStyle}>Phone:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                    required
                />
            </div>
                <button type="submit" style={buttonStyle}>Add Contact</button>
        </form>
    );
    }
// Estilos inline para o formulário
const formStyle = { 
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
};
const inputGroupStyle = {
    marginBottom: '15px'
};  
const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
};
const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
};
const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};
    
export default ContactForm;